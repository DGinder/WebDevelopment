var tag = document.getElementById("highlight");
tag.style.backgroundColor = "yellow";
var tags = document.getElementsByClassName("bolded");
for(i = 0; i < tags.length; i++){
    tags[i].style.fontWeight = 700;
}
var lis = document.getElementsByTagName("li");
for(i = 0; i < lis.length; i++){
    lis[i].style.margin = "10px";
}

var temp = document.querySelectorAll("h1");
for(i = 0; i < temp.length; i++){
    temp[i].style.color = "blue";
}
