'use server';

import DeleteImageCloudinary from "@/lib/cloudinary/deleteImage";
import uploadToCloudinary from "@/lib/cloudinary/uploadImage";
import ConnectMongodb from "@/lib/mongo";
import Service from "@/models/service";
import { NextRequest, NextResponse } from "next/server";


await ConnectMongodb() 
export async function GET(
    request:NextRequest , 
    {params} : {params : Promise<{id : string}>} 
    ) {
    try{
        const id = (await  params).id;
        const service = await  Service.findOne({_id : id})
        return NextResponse.json({
            data:service
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
        const id = (await params).id;
        const formData = await request.formData();
        const serviceName = formData.get('serviceName')
        const serviceDescription = formData.get('serviceDescription')
        const servicePoints = formData.get('servicePoints')
        const serviceImage = formData.get('serviceImage') as File;
        const serviceBanner = formData.get('serviceBanner') as File;
        const service = await  Service.findOne({_id : id})
        const service_url = service.serviceImage.url;
        const public_id = service.serviceImage.public_id;
        const service_urlBanner = service.serviceBanner.url;
        const public_idBanner = service.serviceBanner.public_id;
        if(!serviceImage && !serviceBanner){
            await  Service.updateOne({_id : id},{
                $set:{
                    serviceName:serviceName,
                    servicePoints:servicePoints,
                    serviceDescription:serviceDescription,
                    serviceImage:{
                        url:service_url,
                        public_id:public_id
                    },
                    isActive:true
                }
            })
            const serviceUpdate = await  Service.findOne({_id : id})
            return NextResponse.json({
                message:"Successfully Updated Your Service",
                data:serviceUpdate
            },{
                status:200
            })   
        }
        if(public_id && service_url && serviceImage && serviceBanner && public_idBanner && service_urlBanner){
            const response = await DeleteImageCloudinary(public_id)
            await DeleteImageCloudinary(public_idBanner)
            if(response && response.status == 1){
                console.log('worked');
                const fileBuffer = await serviceImage.arrayBuffer();
                const fileBufferBanner = await serviceBanner.arrayBuffer();
                console.log('file buffer',fileBuffer);
                const mimeType = serviceImage.type;
                const mimeTypeBanner = serviceBanner.type;
                const encoding = "base64";
                const base64Data = Buffer.from(fileBuffer).toString("base64");
                const base64DataBanner = Buffer.from(fileBufferBanner).toString("base64");
                const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
                const fileUriBanner = "data:" + mimeTypeBanner + ";" + encoding + "," + base64DataBanner;
                const response = await uploadToCloudinary(fileUri , serviceImage.name)
                const responseBanner = await uploadToCloudinary(fileUriBanner , serviceBanner.name)
                if (response instanceof  NextResponse){
                    const errorData = await response.json();
                    console.error("Upload failed:", errorData.message);
                    return;
                }
                if(responseBanner instanceof NextResponse){
                    const errorData = await responseBanner.json();
                    console.error("Upload failed:", errorData.message);
                    return;
                }
                if(response && response.status == 201 && response.response.secure_url && responseBanner.status == 201){
                    await  Service.updateOne({_id : id},{
                        $set:{
                            serviceName:serviceName,
                            servicePoints:servicePoints,
                            serviceDescription:serviceDescription,
                            serviceImage:{
                                url:response.response.secure_url,
                                public_id:response.response.public_id
                            },
                            serviceBanner:{
                                url:responseBanner.response.secure_url,
                                public_id:responseBanner.response.public_id
                            },
                            isActive:true
                        }
                    })
                    const serviceUpdate = await  Service.findOne({_id : id})
                    return NextResponse.json({
                        message:"Successfully Updated Your Service",
                        data:serviceUpdate
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
        const error = err as Error;
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }
}


