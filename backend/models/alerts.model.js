import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const alertSchema = mongoose.Schema ({

    _id:Number,
    name:{
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
    startdate: {
        type: String,
        lowercase:true,
        trim:true,

    },
    enddate: {
        type:String,
     
        trim:true,
        lowercase:true,
    },
    admitcarddate: {
        type:String,
      
        trim:true,
        lowercase:true,
    },
    examdate: {
        type:String,
    
        trim:true,
        lowercase:true,
    },
    info:String
});

alertSchema.plugin(uniqueValidator);

const alertSchemaModel = mongoose.model('alert_collection',alertSchema);

export default alertSchemaModel;