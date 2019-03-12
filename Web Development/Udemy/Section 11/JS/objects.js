function creaetPerson(name, age, gender){
    var tempOBJ;
    if(gender != undefined){
        tempOBJ = {
            name: name,
            age: age,
            gender: gender
        }
    }
    else if(age != undefined){
        tempOBJ = {
            name: name,
            age: age
        }
    }
    else{
        tempOBJ = {
            name: name
        }
    }
    return tempOBJ;
}

var tempArray = [];
tempArray.push(creaetPerson("mary", 21));
console.log(tempArray[0]);