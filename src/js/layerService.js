export default class Layer {
  constructor() {
    this.test = 'aaaa';
  }
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const layerService = new Layer();
console.log(layerService);
layerService.setName('AAA');
console.log(layerService.getName());
export { layerService };
