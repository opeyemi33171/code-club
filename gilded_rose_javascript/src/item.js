const { specialItems } = require("./specialItems");

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  increaseQuality() {
    if (this.quality < 50) {
      this.quality += 1;
    }
  }

  decreaseQuality() {
    if (this.quality > 0) {
      this.quality -= 1;
    }
  }

  updateQuality() {
    if (
      this.name != specialItems.AGED_BRIE &&
      this.name != specialItems.BACKSTAGE_PASSES
    ) {
      if (this.name != specialItems.SULFURAS_HAND_OF_RAGNAROS) {
        this.decreaseQuality();
      }
    } else {
      this.increaseQuality();
      if (this.name == specialItems.BACKSTAGE_PASSES) {
        if (this.sellIn < 11) {
          this.increaseQuality();
        }
        if (this.sellIn < 6) {
          this.increaseQuality();
        }
      }
    }
    if (this.name != specialItems.SULFURAS_HAND_OF_RAGNAROS) {
      this.sellIn = this.sellIn - 1;
    }
    if (this.sellIn < 0) {
      if (this.name != specialItems.AGED_BRIE) {
        if (this.name != specialItems.BACKSTAGE_PASSES) {
          if (this.name != specialItems.SULFURAS_HAND_OF_RAGNAROS) {
            this.decreaseQuality();
          }
        } else {
          this.quality = 0;
        }
      } else {
        this.increaseQuality();
      }
    }
  }
}

module.exports = { Item };
