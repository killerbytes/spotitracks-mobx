import { action, makeObservable, observable } from 'mobx';

class CommonStore {
  constructor(api) {
    this.api = api;
    makeObservable(this, {
      isLoading: observable,
      colors: observable,
      setLoading: action,
      setColors: action,
    });
  }
  isLoading = false;
  colors = [];

  setLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setColors = (colors) => {
    this.colors = colors;
  };
  get imageColors() {
    return this.colors.join(',');
  }
}

export default CommonStore;
