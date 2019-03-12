function isEven(num) {
    if(typeof num != "number"){
        if(isNaN(num) == false){
            num = Number(num);
        }
        else{
            return false;
        }
    }
    return(num % 2 == 0)
}

console.log("isEven(4): " + isEven(4));
console.log("isEven('4'): " + isEven('4'));
console.log("isEven(21): " + isEven(21));
console.log("isEven('21'): " + isEven('21'));
console.log("isEven('I am not a Number'): " + isEven('I am not a Number'));

function factorial(num){
    if(isNaN(num) == true){
        return false
    }
    if(num <= 1){
        return 1
    }
    else {
        return num * factorial(num-1)
    }
}

console.log("factorial(5): " + factorial(5));
console.log("factorial(2): " + factorial(2));
console.log("factorial(10): " + factorial(150));
console.log("factorial('0'): " + factorial(0));
console.log("factorial('I am not a Number'): " + factorial('I am not a Number'));

function toSnake(str) {
    myStr = str.replace(/ /g, '_');
    myStr = myStr.replace(/-/g, '_');
    return myStr;
}

console.log("toSnake('hello world'): " + toSnake('hello world'));
console.log("toSnake('hello-world'): " + toSnake('hello world'));
console.log("toSnake('dogs are awesome'): " + toSnake('dogs are awesome'));
console.log("toSnake('dogs-are-awesome'): " + toSnake('dogs-are-awesome'));