/// <reference types="jquery" />
//Check Off Specific Items By Clicking
$("ul").on("click", "li", function () {
    $(this).toggleClass("done")
})

//click x equals delete
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    })
    event.stopPropagation();
})

$("input[type='text']").keypress(function (event) {
    if(event.which === 13){
        //get text
        toDoText = $(this).val();

        //create new li
        $("ul").append("<li><span><i class='fas fa-trash'></i></span> " + toDoText + "</li>");

        //clear input
        $(this).val("")

    }
})

$(".fa-plus").click(function() {
    $("input[type='text']").slideToggle();
})