import { action, computed, decorate, observable } from 'mobx';

class CommonStore {
  constructor(api) {
    this.api = api;
  }
  isLoading = false;
  colors = [];

  loading = (isLoading) => {
    this.isLoading = isLoading;
  };
  get imageColors() {
    return this.colors.join(',');
  }
}

export default decorate(CommonStore, {
  isLoading: observable,
  colors: observable,
  loading: action,
  imageColors: computed,
});
