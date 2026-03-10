import ConnectMongodb from "@/lib/mongo";
import Contact from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";



await ConnectMongodb() 

export async function GET(
    request:NextRequest , 
    {params} : {params : Promise<{id : string}>} 
    ) {
    try{
        const id = (await  params).id;
        const contact = await  Contact.findOne({_id : id})
        return NextResponse.json({
            data:contact
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