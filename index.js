const express =  require("express");
const app = express();
const port = 8080;

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

const path = require("path");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

app.listen(port,()=>{
    console.log(`App listening to port:${port}`);
});


let posts = [
    {
        date:"01/04/2024",
        content:"Today was a great day, I got my driving liecence"
    },
    {
        date:"02/04/2024",
        content:"Today I got my first internship"
    },
    {
        date:"03/04/2024",
        content:"Today I learned about RestApis"
    },

];

//index route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//create
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {date,content} = req.body;
    posts.push({date,content});
    res.redirect("/posts");
});