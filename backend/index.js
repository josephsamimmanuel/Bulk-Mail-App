const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()
app.use(cors())
app.use(express.json())  //middleware
mongoose.connect('mongodb+srv://joseph:123@cluster0.v04jwxl.mongodb.net/passkey?retryWrites=true&w=majority')
.then(function(){
    console.log("Connected Sucessfully...")})
.catch(function(){
    console.log("Failed to Connect...")})

    const credential=mongoose.model("credential",{},"bulkmail")


// Install Nodemailer

const nodemailer = require("nodemailer");





app.post("/sendemail",function(req,res){
    var msg=req.body.msg
    var emaillist=req.body.emaillist
    console.log(msg)
    credential.find().then(function(data){
        const transporter = nodemailer.createTransport({
            service:"gmail",
        
          auth: {
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass,
          },
        });
        
        new Promise(async function(resolve,reject){
            try{
                for(var i=0;i<emaillist.length;i++)
                {
                    await transporter.sendMail({
                        from:"josesamimmanuel@gmail.com",
                        to:emaillist[i],
                        subject:"A message from bulk mail app",
                        text:msg
                    },
                    // function(error,info){
                    //     if(error)
                    //     {
                    //         console.log(error)
                    //         res.send(false)
                    //     }
                    //     else{
                    //         console.log(info)
                    //         res.send(true)
                    //     }
                    // }
                    )
                    console.log("Email sent to:" +emaillist[i])
                }
            resolve("Sucess")
            }
            catch(error){
                reject("Failed")
            }
        }).then(function(){
            res.send(true)
        }).catch(function(){
            res.send(false)
        })  
    })
    .catch(function(error){
        console.log(error)
    })
   
})

app.listen(5000,function(){
    console.log("Server Started....")
})