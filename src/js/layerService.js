export default class Layer {
  constructor() {
    this.name = 'home';
  }
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const layerService = new Layer();
export { layerService };
