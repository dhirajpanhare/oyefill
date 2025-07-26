import '../models/connection.js';
import contactSchemaModel from '../models/contact.model.js';
import rs from 'randomstring';
import jwt from 'jsonwebtoken';

export const  save = async(req,res) => {
    const contacts = await contactSchemaModel.find();
    const l =contacts.length;
    const _id=l==0?1:contacts[l-1]._id+1;

    const contactDetails= {...req.body,"_id":_id,"info":Date()}

    try{
        await contactSchemaModel.create(contactDetails);
        res.status(201).json({"status":true});
    }
catch(error){
    res.status(500).json({"status":false})
}
}
  
export const fetch=async(req,res)=>{
   var messageList=await contactSchemaModel.find(req.query);
 
   if(messageList.length!=0)
     res.status(200).json(messageList);
   else
     res.status(404).json({"status":"Resource not found"});
  };

  
  export var deleteMessage=async(req,res)=>{
   var obj=req.body;
   if(obj!=undefined)
   {
    let messageDetails = await contactSchemaModel.findOne(obj);
    if(messageDetails){
       let msg=await contactSchemaModel.deleteOne(obj);   
       if(msg)
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
