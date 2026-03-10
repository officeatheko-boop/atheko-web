import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true ,
        unique : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false 
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpriry:Date,
    roles:{
        type:[{
            type:String,
            enum:['user','admin']
        }],
        default:['admin']
    }
    
})

const Admin = mongoose.models.Admin || mongoose.model('Admin',AdminSchema);

export default  Admin;