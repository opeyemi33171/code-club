
const divisbleByFour = (year) => isDivisibleBy(year, 4)
const divisbleByOneHundred = (year) => isDivisibleBy(year, 100)

const isDivisibleBy = (number, divisor) => number % divisor === 0

const checkForLeapYear = (year) => {
    if (typeof(year) != 'number') {
        throw new Error();
    }
    return divisbleByFour(year) && !divisbleByOneHundred(year);
}
    

describe("leap year", () => {
    it("should not be divisible by four", () => {
        const result = checkForLeapYear(2023);
        expect(result).toBe(false);
    })

    it("should be divisible by four", () => {
        const result = checkForLeapYear(2024);
        expect(result).toBe(true);
    })
    it('should take a number', () =>{
        expect(()=> checkForLeapYear("twenty twenty-three")).toThrow()
    })

    it("should not be divisible by 100", () =>{
        const result = checkForLeapYear(1900);
        expect(result).toBe(false)
    })
})