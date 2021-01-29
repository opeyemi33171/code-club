function add(numbers) {
  if (numbers.length > 0) {
    return parseInt(numbers);
  }
  return numbers.length;
}

describe("calculator tests", () => {
  it("should return zero for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("should return one for a string of '1'", () => {
    expect(add("1")).toBe(1);
  });

  it("should return two for a string of '2'", () => {
    expect(add("2")).toBe(2);
  });
});
