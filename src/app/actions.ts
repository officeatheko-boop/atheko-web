'use server'
import ConnectMongodb from "@/lib/mongo";
import Service from "@/models/service";
import { NextResponse } from "next/server";

await ConnectMongodb() 
export async function  get_service(){
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