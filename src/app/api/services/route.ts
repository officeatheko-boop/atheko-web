'use server'

import DeleteImageCloudinary from "@/lib/cloudinary/deleteImage";
import uploadToCloudinary from "@/lib/cloudinary/uploadImage";
import ConnectMongodb from "@/lib/mongo";
import Service from "@/models/service";
import { NextRequest, NextResponse } from "next/server";


await ConnectMongodb() 

export async function POST(request:NextRequest) {
        try{
            const formData = await request.formData();
            const serviceName = formData.get('serviceName')
            const serviceDescription = formData.get('serviceDescription')
            const servicePointsReq  = formData.get('servicePoints')
            console.log(typeof servicePointsReq) 
            let servicePoints: string[] = [];
            if(typeof servicePointsReq  === 'string'){
                servicePoints = JSON.parse(servicePointsReq)
            }
            const serviceImage = formData.get('serviceImage') as File 
            
            const serviceBanner = formData.get('serviceBanner') as File
            const serviceNameTaken = await Service.findOne({serviceName:serviceName})  
            if(!serviceName){
                return NextResponse.json({
                    message:"Service Name  is Required"
                },{
                    status:400
                })
            }else if(serviceNameTaken){
                return NextResponse.json({
                    message:"Service Name is Already Taken"
                },{
                    status:400
                })
            }

            if(!servicePoints){
                return NextResponse.json({
                    message:"Service Points is Required"
                },{
                   status:400 
                })
            }else if(servicePoints.length < 5){
                return NextResponse.json({
                    message:"Service Points Must be 5 Points"
                },{
                   status:400 
                }) 
            }

            if(!serviceDescription){
                return NextResponse.json({
                    message:"Service Description is Required"
                },{
                    status:400
                })
            }
            
            if(!serviceImage){
                return NextResponse.json({
                    message:"Service Image is Required"
                },{
                    status:400
                })
            }

            if(!serviceBanner){
                return NextResponse.json({
                    message:"Service Banner Image is Required"
                },{
                    status:400
                })   
            }

            const fileBuffer = await serviceImage.arrayBuffer();
            const fileBufferBanner = await serviceBanner.arrayBuffer();
            const mimeType = serviceImage.type; 
            const mimeTypeBanner = serviceBanner.type;
            const encoding = "base64";
            const base64Data = Buffer.from(fileBuffer).toString("base64");
            const base64DataBanner = Buffer.from(fileBufferBanner).toString("base64");
            const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
            const fileUriBanner = "data:" + mimeTypeBanner + ";" + encoding + "," + base64DataBanner;
            const response = await uploadToCloudinary(fileUri , serviceImage.name)
            console.log("the response of upload",response);
            
            const responseBanner = await uploadToCloudinary(fileUriBanner , serviceBanner.name)
            console.log("the response of upload Banner",responseBanner);
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
            if (response.status == 201 && response.response.secure_url && responseBanner.status == 201){
                const newServiceSchema = await new Service({
                    serviceName,
                    serviceDescription,
                    serviceImage:{
                        url:response.response.secure_url,
                        public_id:response.response.public_id
                    },
                    servicePoints,
                    serviceBanner:{
                        url:responseBanner.response.secure_url,
                        public_id:responseBanner.response.public_id
                    },
                    isActive:true
                })
                newServiceSchema.save()
                console.log(newServiceSchema)
                return NextResponse.json({
                    message:"Successfully Added Service",
                    data:newServiceSchema
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
            const error = err as Error 
            return NextResponse.json({
                message:error.message
            },{
                status:500
            })
        }
}



export async function  GET(){
    try{
        const services = await Service.find()
        return NextResponse.json({
            data:services
        },{
            status:200
        })
    }catch (err : unknown){
        const eror = err as Error
        return NextResponse.json({
            message:eror.message
        },{
            status:500
        })
    }
}



export async function DELETE(request:NextRequest) {
    try{    
        const id = await request.nextUrl.searchParams.get("id")
        const service = await Service.findById({_id : id})
        const public_id = service.serviceImage.public_id;
        const public_idBanner = service.serviceBanner.public_id;
        if(public_id && public_idBanner){
            const response = await DeleteImageCloudinary(public_id)
            const responseBanner = await DeleteImageCloudinary(public_idBanner)
            if(response && response.status === 1 && responseBanner.status === 1){
                await Service.deleteOne({_id : id})
                return NextResponse.json({
                    message:"Successfully Deleted Service"
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
        const error = err as Error
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }
    
}



