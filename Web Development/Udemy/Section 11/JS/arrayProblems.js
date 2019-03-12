function printReverse(array){
    var temp = [];
    for(i = array.length-1; i >= 0; i--){
        temp.push(array[i]);
    }
    return temp;
}

function isUniform(array){
    var first;
    for(i = 0; i < array.length; i++){
        if(i === 0){
            first = array[i];
        }
        else{
            if(array[i] !== first){
                return false;
            }
        }
    }
    return true;
}

function sumArray(array){
    var sum = 0;
    array.forEach(function(num) {
        sum += num;
    });
    return sum;
}

function max(array){
    var max = Number.MIN_VALUE;
    array.forEach(function(num) {
        if(num > max){
            max = num;
        }
    });
    return max;
}

var tempArray = [1,2,3,4];
console.log("printReverse([1,2,3,4]): " + printReverse(tempArray));
var tempArray = ["a","b","c","d"];
console.log('printReverse(["a","b","c","d"]): ' + printReverse(tempArray));

var tempArray = [1,1,1,1];
console.log('isUniform([1,1,1,1]): ' + isUniform(tempArray));
var tempArray = [2,1,1,1];
console.log('isUniform([2,1,1,1]): ' + isUniform(tempArray));
var tempArray = ["a","b","c"];
console.log('isUniform(["a","b","c"]): ' + isUniform(tempArray));
var tempArray = ["a","a","a","a"];
console.log('isUniform(["a","a","a","a"]): ' + isUniform(tempArray));

var tempArray = [1,2,3];
console.log('sumArray([1,2,3]): ' + sumArray(tempArray));
var tempArray = [10,3,10,4];
console.log('sumArray([10,3,10,4]): ' + sumArray(tempArray));
var tempArray = [-5,100];
console.log('sumArray([-5,100]): ' + sumArray(tempArray));

var tempArray = [1,2,3];
console.log('max([1,2,3]): ' + max(tempArray));
var tempArray = [10,3,10,4];
console.log('max([10,3,10,4]): ' + max(tempArray));
var tempArray = [-5,100];
console.log('max([-5,100]): ' + max(tempArray));