function average(grades){
    var sum = 0;
    grades.forEach(function(element){
        sum += element;
    });
    sum = sum / grades.length;
    return Math.round(sum)
}

var grades = [90, 98, 89, 100, 100, 86, 94]
console.log(average(grades))
var grades = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49]
console.log(average(grades))