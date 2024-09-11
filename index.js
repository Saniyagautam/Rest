const express=require("express");
const app=express();
const {v4:uuidv4}=require('uuid');

const port=3000;
const path=require("path");

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"saniyagautam",
        content:"life is jhand",
    },
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"Do coding ",
    },
    {
        id:uuidv4(),
        username:"fivestar",
        content:"eat 5 star do nothing",
    }
];
// first see all posts
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});//showing all posts
})


//second new post
app.get("/posts/new",(req,res)=>{
    res.render("newpost.ejs");//showing the form to user for newpost
})
app.post("/posts",(req,res)=>{
    let id=uuidv4();//getting the id of post
    let {username,content}=req.body;//getting the data of newpost 
    posts.push({id,username,content});//adding new post in arr
    res.redirect("/posts");//redirect to same page after adding a new post
})


//third get a post using id
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id ===p.id);
    res.render("post.ejs",{post});
})


//forth update a post content
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent = req.body.content;
    let post=posts.find((p)=>id ===p.id);
    post.content= newcontent;//replace old content with new content
    res.redirect("/posts");
})
//form for edit
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})


//fifth Delete a post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);//filter posts whose id are not same and make them posts
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("listening to port 3000");
})