import mongoose from "mongoose";


const BannerSchema = new mongoose.Schema({
    bannerTitle :{
        type:String,
        required : true ,
    },
    bannerSubTitle :{
        type:String,
        required : true 
    },
    bannerDescription :{
        type:String,
        required : true 
    },
    bannerImage :{
        url:{
            type:String,
            required : true 
        },
        public_id:{
            type:String,
            required : true 
        }
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
})

const Banner = mongoose.models.Banner || mongoose.model('Banner',BannerSchema);

export default  Banner;