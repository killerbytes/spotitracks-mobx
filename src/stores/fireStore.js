export default class FirebaseStore {
  constructor(api) {
    this.api = api;
  }

  findAll = (id) => {
    return this.api.findAll(id);
  };

  create = (id, payload) => {
    return this.api.create(id, payload);
  };
}
