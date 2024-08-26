const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3001

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection is succesful")
})

const  userSchema = new mongoose.Schema({
    reg_no:String,
    name:String,
    indentification_mark:String,
    standerd:String,
    email:String,
    number:String,
    Permanen_addres:String,
})
 const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'Applynow.html'))
})

app.post('/post',async (req,res)=>{
    const {reg_no,name,indentification_mark,standerd,email,number,Permanen_addres} = req.body
    const user = new Users({
        reg_no,
        name,
        indentification_mark,
        standerd,
        email,
        number,
        Permanen_addres
    })
    await user.save()
    console.log(user)
    res.send("Form submission succesful")
})

app.listen(port,()=>{
    console.log("server started")
})
