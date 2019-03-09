import stores from 'stores'
import { observable, toJS, action, computed } from 'mobx'

export default class CommonStore {
  constructor(api) {
    this.api = api
  }
  @observable isLoading = false
  @observable colors = []

  @action loading = isLoading => {
    this.isLoading = isLoading
  }
  @computed get imageColors() {
    return this.colors.join(',')
  }
}
