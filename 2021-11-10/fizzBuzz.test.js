const fizzBuzz = require("./fizzBuzz");

test("Given a number  n between 1 - 100 print n numbers", () => {
  expect(fizzBuzz(2)).toBe("12");
});

test("Given a multiple of 3 print Fizz", () => {
    expect(fizzBuzz(3)).toBe("12Fizz");
});
