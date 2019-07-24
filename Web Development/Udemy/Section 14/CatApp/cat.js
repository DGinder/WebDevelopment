var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);



//add to data base with new and save
// var george = new Cat({
//     name: "Ms. Norris",
//     age: 11,
//     temperament: "Evil"
// });
// george.save((err, cat) => {
//     if(err){
//         console.log("Something went wrong")
//     }
//     else{
//         console.log("Saved" + cat)
//     }
// });

//add cat with create
// Cat.create({
//     name: "Snow Whtie",
//     age: 15,
//     temperament: "Bland"
// }, (err, cat) => {
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(cat)
//     }
// })

Cat.find({}, (err, cats) => {
    if(err){
        console.log("Oh No Error");
        console.log(err)
    }else{
        console.log((cats));
    }
})

