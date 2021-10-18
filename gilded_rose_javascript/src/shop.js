class Shop {
  constructor(items = []) {
    this.items = items;
  }

  performOvernightUpdate() {
    this.items.forEach((item) => item.updateQuality());
  }
}

module.exports = { Shop };
