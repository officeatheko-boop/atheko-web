import {  NextResponse } from "next/server";

export async function GET(){
    try{
        const respons = NextResponse.json({
            message:"Successfully Logout",
            success:true
        },{
            status:200
        })
        respons.cookies.set("token","",{
            httpOnly:true
        })
        return respons
    }catch (err : unknown){
        const error = err as Error   
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }
}