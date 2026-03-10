import mongoose from "mongoose";


const ContactSchema = new mongoose.Schema({
    fullName : {
        type:String,
        required : true 
    },
    number : {
        type:String,
        required : true 
    },
    email : {
        type:String,
        required : true 
    },
    message : {
        type:String,
        required : true 
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

const Contact = mongoose.models.Contact || mongoose.model('Contact',ContactSchema);

export default  Contact;