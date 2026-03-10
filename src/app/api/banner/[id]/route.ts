'use server';

import DeleteImageCloudinary from "@/lib/cloudinary/deleteImage";
import uploadToCloudinary from "@/lib/cloudinary/uploadImage";
import ConnectMongodb from "@/lib/mongo";
import Banner from "@/models/banner";
import { NextRequest, NextResponse } from "next/server";


await ConnectMongodb() 
export async function GET(
        request:NextRequest,
        {params} : {params : Promise<{id : string}>} 
    ) {
    try{
        const id = ( await params).id;
        const banner = await  Banner.findOne({_id : id})
        return NextResponse.json({
            data:banner
        },{
            status:200
        })
    }catch (err : unknown ){
        const error = err as Error
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }
}


export async function PUT(
    request:NextRequest ,
    {params} : {params : Promise<{id : string}>}  
    ) {
    try{
        const  id =  (await params).id;
        const formData = await request.formData();
        const bannerTitle = formData.get('bannerTitle')
        const bannerDescription = formData.get('bannerDescription')
        const bannerSubTitle = formData.get('bannerSubTitle')
        const bannerImage = formData.get('bannerImage') as File
        const banner = await  Banner.findOne({_id : id})
        if(!banner){
            return NextResponse.json({
                message:"Banner not Found"
            },{
                status:400
            })
        }
        const banner_url = banner.bannerImage.url;
        const public_id = banner.bannerImage.public_id;
        if(public_id && banner_url){
            const response = await DeleteImageCloudinary(public_id)
            if(response && response.status == 1){
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
                if(response && response.status == 201 && response.response.secure_url){
                    await  Banner.updateOne({_id : id},{
                        $set:{
                            bannerTitle:bannerTitle,
                            bannerDescription:bannerDescription,
                            bannerSubTitle:bannerSubTitle,
                            bannerImage:{
                                url:response.response.secure_url,
                                public_id:response.response.public_id
                            },
                            isActive:true
                        }
                    })
                    return NextResponse.json({
                        message:"Successfully Updated Your Banner"
                    },{
                        status:200
                    })
                }else{  
                    return NextResponse.json({
                        message:"Something Went Wrong Please Try Again"
                    },{
                        status:400
                    })
                }
            }else{
                return NextResponse.json({
                    message:"Something Went Wrong Please Try Again"
                },{
                    status:400
                })
            }     
            }else{
            return NextResponse.json({
                message:"Something Went Wrong Please Try Again"
            },{
                status:400
            })
        }     

    }catch (err : unknown){
        const error = err as Error
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }
}


