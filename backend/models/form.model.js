import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const formSchema = mongoose.Schema ({

    _id:Number,
    formName:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
    },
   catName: {
        type: String,
        lowercase:true,
        trim:true,
    },
    formPrice: {
        type: String,
        lowercase:true,
        trim:true,

    },
   description: {
        type:String,
        trim:true,
        lowercase:true,
    },
    nLink: {
        type:String,
      
        trim:true,
        lowercase:true,
    },
    fLink: {
        type:String,
        trim:true,
        lowercase:true,
    },
    info:String
});

formSchema.plugin(uniqueValidator);

const formSchemaModel = mongoose.model('form_collection',formSchema);

export default formSchemaModel;