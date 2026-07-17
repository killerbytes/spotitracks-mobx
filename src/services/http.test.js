import axios from 'axios';
import stores from '../stores';

jest.mock('axios', () => {
  const mockAxios = {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    request: jest.fn(),
  };
  return mockAxios;
});

jest.mock('../stores', () => ({
  __esModule: true,
  default: {
    authStore: {
      refreshToken: jest.fn(),
    },
  },
}));

// Import http after mocking axios to capture its call to interceptors.response.use
import './http';

describe('Http Service response interceptor', () => {
  let interceptorErrorCallback;

  beforeAll(() => {
    const mockUse = axios.interceptors.response.use;
    expect(mockUse).toHaveBeenCalled();
    interceptorErrorCallback = mockUse.mock.calls[0][1];
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should refresh token and retry the request on 401 token expired error', async () => {
    const mockError = {
      message: 'Token expired',
      response: {
        status: 401,
        data: {
          error: { message: 'The access token expired' },
        },
      },
      config: {
        url: '/api/test',
        headers: {},
      },
    };

    const newAccessToken = 'new-access-token-123';
    stores.authStore.refreshToken.mockResolvedValueOnce({ access_token: newAccessToken });
    axios.request.mockResolvedValueOnce({ data: 'success-data' });

    const promise = interceptorErrorCallback(mockError);

    expect(promise).toBeInstanceOf(Promise);

    const result = await promise;

    expect(stores.authStore.refreshToken).toHaveBeenCalledTimes(1);
    expect(mockError.config.headers['Authorization']).toBe(`Bearer ${newAccessToken}`);
    expect(axios.request).toHaveBeenCalledWith(mockError.config);
    expect(result).toEqual({ data: 'success-data' });
  });

  it('should queue subsequent 401 requests and only perform one token refresh', async () => {
    const mockError1 = {
      response: {
        status: 401,
        data: { error: { message: 'The access token expired' } },
      },
      config: { url: '/api/req1', headers: {} },
    };

    const mockError2 = {
      response: {
        status: 401,
        data: { error: { message: 'The access token expired' } },
      },
      config: { url: '/api/req2', headers: {} },
    };

    const newAccessToken = 'new-access-token-456';
    let resolveRefresh;
    const refreshPromise = new Promise((resolve) => {
      resolveRefresh = resolve;
    });
    stores.authStore.refreshToken.mockReturnValueOnce(refreshPromise);

    axios.request.mockResolvedValue({ data: 'retried-ok' });

    const p1 = interceptorErrorCallback(mockError1);
    const p2 = interceptorErrorCallback(mockError2);

    expect(stores.authStore.refreshToken).toHaveBeenCalledTimes(1);

    resolveRefresh({ access_token: newAccessToken });

    const [r1, r2] = await Promise.all([p1, p2]);

    expect(r1).toEqual({ data: 'retried-ok' });
    expect(r2).toEqual({ data: 'retried-ok' });

    expect(mockError1.config.headers['Authorization']).toBe(`Bearer ${newAccessToken}`);
    expect(mockError2.config.headers['Authorization']).toBe(`Bearer ${newAccessToken}`);

    expect(axios.request).toHaveBeenCalledTimes(2);
    expect(axios.request).toHaveBeenNthCalledWith(1, mockError1.config);
    expect(axios.request).toHaveBeenNthCalledWith(2, mockError2.config);
  });

  it('should reject all queued requests if token refresh fails', async () => {
    const mockError1 = {
      response: {
        status: 401,
        data: { error: { message: 'The access token expired' } },
      },
      config: { url: '/api/req1', headers: {} },
    };

    const mockError2 = {
      response: {
        status: 401,
        data: { error: { message: 'The access token expired' } },
      },
      config: { url: '/api/req2', headers: {} },
    };

    const refreshError = new Error('Refresh failed');
    stores.authStore.refreshToken.mockRejectedValueOnce(refreshError);

    const p1 = interceptorErrorCallback(mockError1);
    const p2 = interceptorErrorCallback(mockError2);

    await expect(p1).rejects.toThrow('Refresh failed');
    await expect(p2).rejects.toThrow('Refresh failed');

    expect(axios.request).not.toHaveBeenCalled();
  });

  it('should reject immediately for non-401 errors', async () => {
    const mockError = {
      response: {
        status: 500,
        data: { error: { message: 'Internal Server Error' } },
      },
      config: { url: '/api/test', headers: {} },
    };

    const promise = interceptorErrorCallback(mockError);
    await expect(promise).rejects.toEqual(mockError);

    expect(stores.authStore.refreshToken).not.toHaveBeenCalled();
  });

  it('should not retry if the error is from the refresh endpoint itself', async () => {
    const mockError = {
      response: {
        status: 401,
        data: { error: { message: 'The access token expired' } },
      },
      config: { url: '/refresh', headers: {} },
    };

    const promise = interceptorErrorCallback(mockError);
    await expect(promise).rejects.toEqual(mockError);

    expect(stores.authStore.refreshToken).not.toHaveBeenCalled();
  });

  it('should handle case-insensitive authorization header during retry', async () => {
    const mockError = {
      response: {
        status: 401,
        data: { error: { message: 'The access token expired' } },
      },
      config: {
        url: '/api/test',
        headers: {
          authorization: 'Bearer expired-token',
        },
      },
    };

    const newAccessToken = 'new-access-token-789';
    stores.authStore.refreshToken.mockResolvedValueOnce({ access_token: newAccessToken });
    axios.request.mockResolvedValueOnce({ data: 'retry-success' });

    await interceptorErrorCallback(mockError);

    const headers = mockError.config.headers;
    const authHeader = headers['Authorization'] || headers['authorization'];
    expect(authHeader).toBe(`Bearer ${newAccessToken}`);

    if (!headers.set) {
      expect(headers['authorization']).toBeUndefined();
      expect(headers['Authorization']).toBe(`Bearer ${newAccessToken}`);
    }
  });

  it('should refresh token and retry for any 401 error message', async () => {
    const mockError = {
      response: {
        status: 401,
        data: {
          error: { message: 'Only valid bearer authentication supported' },
        },
      },
      config: {
        url: '/api/test',
        headers: {},
      },
    };

    const newAccessToken = 'new-access-token-999';
    stores.authStore.refreshToken.mockResolvedValueOnce({ access_token: newAccessToken });
    axios.request.mockResolvedValueOnce({ data: 'retry-any-msg-success' });

    const promise = interceptorErrorCallback(mockError);
    const result = await promise;

    expect(stores.authStore.refreshToken).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: 'retry-any-msg-success' });
  });
});
