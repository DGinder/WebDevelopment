window.setTimeout(todo, 500);
var todoList = [];

function todo (){
    var action = "";
    while(action != "quit"){
        action = prompt("What would you like to do?")
        action = action.toLocaleLowerCase();
        switch(action){
            case "new":
            newTodo();
                break;
            case "list":
                listTodo();
                break;
            case "delete":
                deleteTodo();
                break;
            case "quit":
                break;
            default:
                alert("That is not a valid option!");
        }
    }
}

function listTodo(){
    console.log("***********")
    todoList.forEach(function(item, index){
        console.log(index + ": " + item);
    })
    console.log("***********")
}

function newTodo(){
    var temp = prompt("What would you like to add to the todo list?");
    todoList.push(temp);
    console.log(temp + " added to list!");
}

function deleteTodo(){
    var index = prompt("What index would you liek to delete?");
    var oldItem = todoList[index];
    todoList.splice(index, 1);
    console.log("Deleted " + oldItem);
}
