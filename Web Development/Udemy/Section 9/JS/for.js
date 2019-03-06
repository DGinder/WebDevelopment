console.log("Print all Numbers between -10 and 19");
for(i = -10; i < 20; i++){
    console.log(i);
}
console.log("Print all even numbers between 10 and 40");
for(i = 10; i < 41; i++){
    if(i%2 == 0){
        console.log(i);
    }
}
console.log("Print all odd numbers between 300 and 333");
for(i = 300; i < 334; i++){
    if(i%2 != 0){
        console.log(i);
    }
}
console.log("Print all numbers divisable by 3 and 15 between 0 and 45");
for(i = 0; i < 50; i+=15){
    if(i%5 == 0 && i%3 == 0){
        console.log(i);
    }
}