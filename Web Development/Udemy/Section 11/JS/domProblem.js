var bool = true;
var btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", function(){
    if(bool == true){
        document.body.style.background = "purple";
    }
    else{
        document.body.style.background = "white";
    }
    bool = !bool;
})