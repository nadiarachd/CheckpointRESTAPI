const express=require("express")
const connect=require("./config/connectDB")
require("dotenv").config({ path: "./.env" });
const path = require("path");
const cors=require("cors")
const User =require("./models/User.js")
// Instanciation

const app = express();

//middleware
app.use(express.json())
app.use(cors())
//connect DB
connect() 

//Routes
app.use(express.urlencoded({ extended: true }));


//http://localhost:5000/users
//GET All Users
//
app.get("/users", (req, res) => {
    User.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
///http://localhost:5000/add
//POST ADD A NEW USER TO THE DATABASE 
//
app.post("/add", (req, res) => {
    const user = new User(req.body);
    user
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
//http://localhost:5000/users/edituser
  // PUT : EDIT A USER BY ID 
//
app.put("/users/edituser/:id",async(req, res) => {
  // req.body={name:"mohamed",age:15} ==> ...req.body
try {
  
  const data = await  User.findOneAndUpdate({ _id: req.params.id },{$set:{...req.body}})

  console.log(data)
  res.json({msg:"user edited",data})
} catch (err) {
  console.log(err)
}
  
     
      
  });
//http://localhost:5000/delete
  //DELETE : REMOVE A USER BY ID 
app.delete("/delete/:id", async(req, res) => {
    try {
     const data =  await User.deleteOne({ _id: req.params.id })
     console.log(data)
     res.json({msg:"user deleted",data}) 
     
      
    
    }
  
      catch(err)  {
        console.log(err);
      }})
  
// Port
const port =5000
app.listen(port,err=>{
    err? console.log(err): console.log(`server is running on port ${port}`)
})