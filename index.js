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
        id:"1a",
        date:"01 April 2024",
        content:"Today was a great day, I got my driving liecence"
    },
    {
        id:"2b",
        date:"02 April 2024",
        content:"Today I got my first internship"
    },
    {
        id:"3c",
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
    posts.push({date,content});
    res.redirect("/posts");
});

//show route (search entry by id)
app.get("/posts/:date",(req,res)=>{
    let {date}= req.params;
    let post = posts.find((p)=> date === p.date);
    res.render("show.ejs",{post});
});
