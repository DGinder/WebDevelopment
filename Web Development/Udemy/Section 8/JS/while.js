var temp = -10;
console.log("Print all numbers between -10 and 19");
while(temp <= 19){
    console.log(temp);
    temp++;
}
temp = 10;
console.log("Print all even numbers between 10 and 40");
while(temp <= 40){
    if(temp%2 == 0){
        console.log(temp);
    }
    temp++;
}
temp = 300;
console.log("Print all odd numbers between 300 and 333");
while(temp <= 333){
    if(temp%2 != 0){
        console.log(temp);
    }
    temp++;
}
temp = 5;
console.log("Print all numbers divisible by 5 and 3 between 5 and 50");
while(temp <= 50){
    if(temp%5 == 0 && temp%3 == 0){
        console.log(temp);
    }
    temp++;
}
