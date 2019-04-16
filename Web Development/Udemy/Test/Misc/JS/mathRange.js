

function goalNumber(){
    var rand = Math.random();
    rand = rand * 6;
    rand = Math.floor(rand);
    return rand;
}

while(true){
    var number = goalNumber();
    if(number === 6){
        console.log("6 reached")
        break;
    }
    else{
        console.log(number);
    }
}