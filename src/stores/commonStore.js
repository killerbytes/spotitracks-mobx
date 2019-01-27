import stores from 'stores'
import { observable, toJS, action } from 'mobx'

export default class CommonStore {
  constructor(api) {
    this.api = api
  }
  @observable isLoading = false

  @action loading = isLoading => {
    this.isLoading = isLoading
  }
}
