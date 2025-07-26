import '../models/connection.js';
import alertSchemaModel from '../models/alerts.model.js'
import rs from 'randomstring';
import jwt from 'jsonwebtoken';

export const save = async (req, res) => {
    const alerts = await alertSchemaModel.find();
    const l = alerts.length;
    const _id = l == 0 ? 1 : alerts[l - 1]._id + 1;

    const alertDetails = { ...req.body, "_id": _id, "info": Date() }
    console.log(alertDetails)
    try {
        await alertSchemaModel.create(alertDetails);
        res.status(201).json({ "status": true });
    }
    catch (error) {
        res.status(500).json({ "status": false })
    }
}


export const fetch=async(req,res)=>{
   var alertList=await alertSchemaModel.find(req.query);
 
   if(alertList.length!=0)
     res.status(200).json(alertList);
   else
     res.status(404).json({"status":"Resource not found"});
  };
   
  
  export var deleteAlert=async(req,res)=>{
   var obj=req.body;
   if(obj!=undefined)
   {
    let alertDetails = await alertSchemaModel.findOne(obj);
    if(alertDetails){
       let alert=await alertSchemaModel.deleteOne(obj);   
       if(alert)
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
