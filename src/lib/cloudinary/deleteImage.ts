import { cloudinary } from ".";


export default async function DeleteImageCloudinary(public_id  : string){
    try{
        const response = await cloudinary.uploader.destroy(public_id)
        console.log(response)
        const res = {
            "status":1,
            "message":"Successfully Deleted Image"
        }
        return res 
    }catch(err : unknown){
        const error = err as  Error
        const res = {
            "status":0,
            "message":error.message
        }
        return res 
    }
}