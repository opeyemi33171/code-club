function fizzBuzz(n){
    let numbers = [...Array(n).keys()]

    numbers = numbers.reduce((result, element) => {
        if((element + 1) % 3 == 0){
            return result + "Fizz";
        }else{
            return result + (element + 1);
        }
    });
    
    return numbers;
}

module.exports = fizzBuzz;
