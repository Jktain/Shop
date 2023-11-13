class Clothing extends Product {
  constructor(head, image, price, presence, text, type, size) {
    super(head, image, price, presence, text, type);
    this.size = size;
  }
}
