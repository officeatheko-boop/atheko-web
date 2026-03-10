import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
    username : {
        type:String,
        required : true 
    },
    number : {
        type:String,
        required : true 
    },
    place : {
        type:String,
        required : true 
    },
    scheduledDate : {
        type:Date,
        required : true 
    },
    scheduledTime : {
        type:String,
        required : true 
    },
    commands : {
        type:String,
        required : false 
    },
    services : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required: true,
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

const Booking = mongoose.models.Booking || mongoose.model('Booking',BookingSchema);

export default  Booking;