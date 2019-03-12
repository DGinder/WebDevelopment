function randomColor(object){
    var num1 = Math.floor(Math.random() * 256);
    var num2 = Math.floor(Math.random() * 256);
    var num3 = Math.floor(Math.random() * 256);

    object.style.color = "rgb(" + num1 + ", " + num2 + ", " + num3 + ")";
}


var h1 = document.querySelector("h1");

setInterval(function(){randomColor(h1)}, 1000);