'use server';

import DeleteImageCloudinary from "@/lib/cloudinary/deleteImage";
import uploadToCloudinary from "@/lib/cloudinary/uploadImage";
import ConnectMongodb from "@/lib/mongo";
import Banner from "@/models/banner";
import { getError } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";


await ConnectMongodb() 

export async function POST(request:NextRequest) {
        try{
            const formData = await request.formData();
            const bannerTitle = formData.get('bannerTitle')
            const bannerDescription = formData.get('bannerDescription')
            const bannerSubTitle = formData.get('bannerSubTitle')
            const bannerImage = formData.get('bannerImage') as File
            if(!bannerTitle){
                return NextResponse.json({
                    message:"Banner Title is Required"
                },{
                    status:400
                })
            }
            if(!bannerDescription){
                return NextResponse.json({
                    message:"Banner Description is Required"
                },{
                    status:400
                })
            }

            if(!bannerSubTitle){
                return NextResponse.json({
                    message:"Banner Sub Title is Required"
                },{
                    status:400
                })
            }

            if(!bannerImage){
                return NextResponse.json({
                    message:"Banner Image is Required"
                },{
                    status:400
                })
            }

            const fileBuffer = await bannerImage.arrayBuffer();
            const mimeType = bannerImage.type;
            const encoding = "base64";
            const base64Data = Buffer.from(fileBuffer).toString("base64");
            const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
            const response = await uploadToCloudinary(fileUri , bannerImage.name) 
            if (response instanceof  NextResponse){
                const errorData = await response.json();
                console.error("Upload failed:", errorData.message);
                return;
            }
            if (response.status == 201 && response.response.secure_url){
                const newSchemaBanner = await new Banner({
                    bannerTitle,
                    bannerDescription,
                    bannerSubTitle,
                    bannerImage:{
                        url:response.response.secure_url,
                        public_id:response.response.public_id
                    }
                })
                newSchemaBanner.save()
                return NextResponse.json({
                    message:"Successfully Added Banner"
                },{
                    status:201
                })
            }else{
                return NextResponse.json({
                    message:response
                },{
                    status:500
                })
            }
        }catch(err : unknown ){
            return NextResponse.json({
                message:getError(err)
            },{
                status:500
            })
        }
}



export async function  GET(request : NextRequest){
    console.log(request)
    try{
        const banners = await Banner.find()
        return NextResponse.json({
            data:banners
        },{
            status:200
        })
    }catch (er : unknown){
        return NextResponse.json({
            message:getError(er)
        },{
            status:500
        })
    }
}



export async function DELETE(request:NextRequest) {
    try{    
        const id = await request.nextUrl.searchParams.get("id")
        const banner = await Banner.findById({_id : id})
        const public_id = banner.bannerImage.public_id;
        if(public_id){
            const response = await DeleteImageCloudinary(public_id)
            if(response && response.status === 1){
                await Banner.deleteOne({_id : id})
                return NextResponse.json({
                    message:"Successfully Deleted Banner"
                },{
                    status:200
                })
            }else{
                return NextResponse.json({
                    message:"Something Went Wrong Please Try Again"
                },{
                    status:500
                })
            }
        }else{
            return NextResponse.json({
                message:"Something Went Wrong Please Try Again"
            },{
                status:500
            })
        }
    }catch (err : unknown){
        return NextResponse.json({
            message:getError(err)
        },{
            status:500
        })
    }
    
}



