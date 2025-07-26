import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema ({

    _id:Number,
    name:{
        type:String,
        lowercase:true,
        uppercase:true,
        trim:true,
        required:["name is required"]
    },
    email: {
        type: String,
        lowercase:true,
        uppercase:true,
        unique:true,
        trim:true,
        required:["email is required"]
    },
    number: {
        type:String,
        unique:true,
        maxlength:10,
        minlength:10
    },
    password:{
        type:String,
        lowercase:true,
        uppercase:true,
        trim:true, 
         minlength:5,
        maxlength:10
    },
    role:String,
    status:Number,
    info:String
});

userSchema.plugin(uniqueValidator);

const userSchemaModel = mongoose.model('user_collection',userSchema);

export default userSchemaModel;