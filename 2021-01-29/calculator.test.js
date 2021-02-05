function add(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  if (numbers.length >= 3) {
    let numbersArray = numbers.split(",");
    if (numbersArray.length === 3) {
      return (
        parseInt(numbersArray[0]) +
        parseInt(numbersArray[1]) +
        parseInt(numbersArray[2])
      );
    }
    return parseInt(numbersArray[0]) + parseInt(numbersArray[1]);
  }
  return parseInt(numbers);
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

  it("should return 2 for a string of '1,1'", () => {
    expect(add("1,1")).toBe(2);
  });
  it("should return three for a string of '1,2", () => {
    expect(add("1,2")).toBe(3);
  });
  it("should return 11 for a string of '1,10'", () => {
    expect(add("1,10")).toBe(11);
  });
  it("should return 3 for a string of '1,1,1'", () => {
    expect(add("1,1,1")).toBe(3);
  });
});
