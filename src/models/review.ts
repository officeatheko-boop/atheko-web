import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    reviewText : {
        type:String,
        required : true 
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

const Review = mongoose.models.Review || mongoose.model('Review',ReviewSchema);

export default  Review;