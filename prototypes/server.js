const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app=express();
mongoose.connect("mongodb://localhost:27017/peopledb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const pschema=mongoose.Schema({
    phone: Number,
    pass: String,
    repassw: String,
    remps: String
});
const pdata=mongoose.model("people",pschema);


app.use(bodyParser.urlencoded({extended: true}));
app.get("/register",function(req,res){
    res.sendFile(__dirname+"/register.html")
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});
app.get("/help",function(req,res){
    res.sendFile(__dirname+"/help.html")
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});
app.post("/register",function(req,res){
    var ppldata=new pdata({
        phone: req.body.number,
        pass: req.body.password,
        repassw: req.body.repass,
        remps: req.body.remember_me
    });
    console.log(ppldata);
    res.sendFile(__dirname+"/register.html");
    ppldata.save(function(err,res1){
        if(err) throw err;
    });
    app.get("/",function(req,res){
        res.sendFile(__dirname+"/index.html")
    });
});

app.listen(3000);