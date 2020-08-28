const assert = require("assert");
const x = (items) => ({
  total: items.length * 8,
  items,
});
describe("potter books kata", () => {
  it("should cost 0 euros for an empty basket", () => {
    const basket = x();
    expect(basket.total).toEqual(0);
    expect(basket.items.length).toEqual(0);
  });

  // it("should cost 8 euros for a basket containing one book", () => {
  //   const basket = {
  //     total: 8,
  //     items: [""],
  //   };
  //   expect(basket.total).toEqual(8);
  //   expect(basket.items.length).toEqual(1);
  // });

  // it("should cost 16 euros for two of the same book", () => {

  //   expect([book.cost, book.cost]).toEqual(16);
  // });
});
