import '../models/connection.js';
import formSchemaModel from '../models/form.model.js';
import rs from 'randomstring';
import jwt from 'jsonwebtoken';

export const save = async (req, res) => {
    const forms = await formSchemaModel.find();
    const l = forms.length;
    const _id = l == 0 ? 1 : forms[l - 1]._id + 1;

    const formsDetails = { ...req.body, "_id": _id, "info": Date() }
    
    try {
        await formSchemaModel.create(formsDetails);
        res.status(201).json({ "status": true });
    }
    catch (error) {
        res.status(500).json({ "status": false })
    }
}
export const fetch = async (req, res) => {
  try {
    const catName = req.params.catName;
    console.log('Category:', catName);

    const forms = await formSchemaModel.find({
      catName // Case-insensitive exact match
    });
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching category forms:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


export const full=async(req,res)=>{
   var formList=await formSchemaModel.find(req.query);
 
   if(formList.length!=0)
     res.status(200).json(formList);
   else
     res.status(404).json({"status":"Resource not found"});
  };
   
    export var deleteForm= async(req,res)=>{
   var obj=req.body;
   if(obj!=undefined)
   {
    let formDetails = await formSchemaModel.findOne(obj);
    if(formDetails){
       let form=await formSchemaModel.deleteOne(obj);   
       if(form)
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


