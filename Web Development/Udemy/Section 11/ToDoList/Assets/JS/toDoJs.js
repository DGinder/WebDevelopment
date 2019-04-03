/// <reference types="jquery" />
//Check Off Specific Items By Clicking
$("li").on("click", function () {
    $(this).toggleClass("done")
})

//click x equals delete
$("span").on("click", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    })
    event.stopPropagation();
})