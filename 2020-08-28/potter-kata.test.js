const assert = require("assert");

const bookPrice = 8;

const applyDiscountedPrice = (numberUniqueItems, discountedPrice) =>
  numberUniqueItems * bookPrice * discountedPrice;

const bananas = (numberUniqueItems, numberOfItems) => {
  if (numberUniqueItems == 3) {
    return applyDiscountedPrice(numberUniqueItems, 0.9);
  }
  if (numberUniqueItems == 2 && numberUniqueItems == numberOfItems) {
    return applyDiscountedPrice(numberUniqueItems, 0.95);
  }
  return applyDiscountedPrice(numberOfItems, 1);
};

const calculateBasketTotal = (items) => {
  const numberOfItems = items.length;
  const itemSet = new Set(items.map((book) => book.title));
  const numberUniqueItems = itemSet.size;

  return bananas(numberUniqueItems, numberOfItems);
};

const createItem = (title) => ({ title });

describe("potter books kata", () => {
  it("should cost 0 euros for an empty basket", () => {
    const total = calculateBasketTotal([]);
    expect(total).toEqual(0);
  });

  it("should cost 8 euros for a basket containing one book", () => {
    const total = calculateBasketTotal([createItem("book one")]);
    expect(total).toEqual(8);
  });

  it("should cost 15.20 euros for two different books", () => {
    const total = calculateBasketTotal([
      createItem("Book one"),
      createItem("Book two"),
    ]);
    expect(total).toEqual(15.2);
  });
  it("should cost 16 euros for two of the same books", () => {
    const total = calculateBasketTotal([
      createItem("Book one"),
      createItem("Book one"),
    ]);
    expect(total).toEqual(16);
  });
  it("should cost 21.60 euros for three different books", () => {
    const total = calculateBasketTotal([
      createItem("Book one"),
      createItem("Book two"),
      createItem("Book three"),
    ]);
    expect(total).toEqual(21.6);
  });
});
