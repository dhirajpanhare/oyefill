  import '../models/connection.js';
  import userSchemaModel from '../models/user.model.js';
  import rs from 'randomstring';
  import jwt from 'jsonwebtoken';

  export const  save = async(req,res) => {
      const users = await userSchemaModel.find();
      const l =users.length;
      const _id=l==0?1:users[l-1]._id+1;

      const userDetails= {...req.body,"_id":_id,"role":"user","status":1,"info":Date()}

      try{
          await userSchemaModel.create(userDetails);
          res.status(201).json({"status":true});
      }
  catch(error){
      res.status(500).json({"status":false})
  }
  }
  


export const fetch=async(req,res)=>{
   var userList=await userSchemaModel.find(req.query);
 
   if(userList.length!=0)
     res.status(200).json(userList);
   else
     res.status(404).json({"status":"Resource not found"});
  };
   

  export var deleteUser=async(req,res)=>{
   var obj=req.body;
   if(obj!=undefined)
   {
    let userDetails = await userSchemaModel.findOne(obj);
    if(userDetails){
       let user=await userSchemaModel.deleteOne(obj);   
       if(user)
         res.status(200).json({"status":"OK"});
       else
         res.status(500).json({"status": "Server Error"});
      }
    else
     res.status(404).json({"status":"Requested resource not available"});
   } 
   else
    res.status(500).json({"status": "Please enter valid condition"});
   };


   export var update=async(req,res)=>{
      var obj=req.body;
      if(obj!=undefined)
      {
         let userDetails = await userSchemaModel.findOne(req.body.condition_obj);
         if(userDetails){
             let user=await userSchemaModel.updateOne(req.body.condition_obj,{$set: req.body.content_obj});   
             if(user)
               res.status(200).json({"msg":"OK"});
             else
               res.status(500).json({"status": "Server Error"});
         }
         else
           res.status(404).json({"status":"Requested resource not available"});   
      }
      else
        res.status(500).json({"status": "Please enter valid condition"});
   };
   


export const login = async(req,res) => {
    var condition_obj = {...req.body,"status":1};

    var userList=await userSchemaModel.find(condition_obj);

    if(userList.length != 0){
        const payload =userList[0].email;
        const key = rs.generate(50);
        const token = jwt.sign(payload,key)
        res.status(200).json({"token":token,"userDetails":userList[0]})
    }
    else{
        res.status(500).json({"token":"error"})
    }
} 