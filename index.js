const express =  require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const path = require("path");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

app.listen(port,()=>{
    console.log(`App listening to port:${port}`);
});


let posts = [
    {
        id:uuidv4(),
        date:"01 April 2024",
        content:"Today was a great day, I got my driving liecence"
    },
    {
        id:uuidv4(),
        date:"02 April 2024",
        content:"Today I got my first internship"
    },
    {
        id:uuidv4(),
        date:"03 April 2024",
        content:"Today I learned about RestApis"
    },

];

//index route 
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//create route (make new entry)
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {date,content} = req.body;
    let id = uuidv4();
    posts.push({id,date,content});
    res.redirect("/posts");
});

//show route (search entry by id)
app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
});

//Edit route (edit an entry)
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});
