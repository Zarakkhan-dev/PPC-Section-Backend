const express = require("express");
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const app =express();
app.use(express.json());
require("./Backend/connection")
const model= require("./Backend/Schema");
var cors = require('cors');
app.use(cors())
const secretKey = 'mysecretkeyistobuildreactnativeappofsectionsoflaw1to351';

app.get("/",(req,res)=>{
    res.send("homepage");
})
app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const userResponse = await model.findOne({email});
        if(userResponse){
            const hash_password = await bcrypt.compare(password,userResponse.password);
            if(hash_password){
                const token = jwt.sign({email},secretKey);
                await userResponse.updateOne(email,token);

                res.status(201).json({message:"User Login Sucessfully",token});
            }
            else{
                res.status(202).json({message:"Invalid Email or password"});
            }
        }
        else{
            res.status(202).json({message:"Invalid Email or password"});
        }
    }catch(error){
        console.log(error)
    }
})
app.post("/signup",async(req,res)=>{
  
    const {username,email,password }= req.body;
    try {
        const userResponse = await model.findOne({email});
        if(!userResponse){
        const hash_password = await bcrypt.hash(password,10);
        const token = jwt.sign({email},secretKey);
        const UserData = new model ({username,email,password:hash_password,token});
        const SavedResponse = await UserData.save();
        if(SavedResponse){
            res.status(201).json({message:"Registered Successfully",token})
            
        }
        else{
            res.status(202).json({message:"Not Registered Successfully"})
        }
        }else{
            res.status(200).json({message:"user Already Exist"});
        }

    } catch (error) {
        console.log(error)
    }
   
})
app.get("/home",(req,res)=>{
    res.send("hello world")
})
app.listen(8000,()=>{
    console.log("listening ar port 3000")
})
