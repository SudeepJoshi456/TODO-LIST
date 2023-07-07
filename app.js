

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

// can push into const arrays
const items = ["Eat food", "Cook food", "Buy food"];
const workLists = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    let day = date.getDate();
    res.render("list", {listTitle:day, newListItem:items});
})

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work List", newListItem:workLists})
})

app.post("/", (req,res)=>{
    const item = req.body.newItem;
    if(req.body.list === "Work List"){
        workLists.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

})

app.get("/about", (req,res)=>{
    res.render("about");
})

// app.post("/work", (req,res)=>{
//     let item = req.body.newItem;
//     workLists.push(item);
//     res.redirect("/work");
// });

app.listen(3000, function(){
    console.log("server is running on port 3000");
})