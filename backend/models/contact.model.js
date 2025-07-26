import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const contactSchema = mongoose.Schema ({

    _id:Number,
    name:{
        type:String,
        lowercase:true,
        trim:true,
        required:["name is required"]
    },
    email: {
        type: String,
        lowercase:true,
        trim:true,
       required:["email is required"]
    },
    message: {
        type:String,
        required:["message is required"],
        trim:true
    },
    info:String
});

contactSchema.plugin(uniqueValidator);

const contactSchemaModel = mongoose.model('contact_collection',contactSchema);

export default contactSchemaModel;