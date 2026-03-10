import ConnectMongodb from "@/lib/mongo";
import Review from "@/models/review";
import { NextRequest, NextResponse } from "next/server";


await ConnectMongodb()
export async function POST(request:NextRequest) {
    try{
        const{ reviewText} = await request.json()
        if(!reviewText){
            return NextResponse.json({
                message:"Review Text is Required"
            },{
                status:400
            })
        }
        const ReviewSchema = await new Review({
            reviewText
        })
        ReviewSchema.save()
        return NextResponse.json({
            message:"Successfully Added Your Review"
        },{
            status:201
        })
    }catch (err : unknown){
        const error = err as Error
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }
}



export async function GET(request:NextRequest) {
    console.log(request)
    try{
        const reviews = await Review.find()
        return NextResponse.json({
            data:reviews
        },{
            status:200
        })
    }catch (err: unknown ){
        const error = err as Error
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }

}



export async function DELETE(request:NextRequest) {
    try{    
        const id = await request.nextUrl.searchParams.get("id")
        const review = await Review.findById({_id : id})
        await review.deleteOne({_id : id})
        return NextResponse.json({
            message:"Successfully Deleted Review"
        },{
            status:200
        })
    }catch (err : unknown){
        const error = err as Error
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }
    
}