import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import  {User} from "@/types/type"

export async function POST(request: NextRequest){
    try{
        const {username , password } = await request.json() 
        if(!username){
            return NextResponse.json({
                message:"Username is Required"
            },{
                status:400
            })
        }
        if(!password){
            return NextResponse.json({
                message:"Password is Required"
            },{
                status:400
            })
        }
        if( username !== process.env.USER_NAME  || password !== process.env.PASSWORD){
            return NextResponse.json({
                message:"Invalid credentials"
            },{
                status:400
            })
        }
        const tokanData : User = {
            id:process.env.USER_ID!,
            username:process.env.USER_NAME!,
            password:process.env.PASSWORD!
        }

        if(process.env.SECRET_KEY){

            const tokan = await jwt.sign(
                tokanData,
                process.env.SECRET_KEY,
                { expiresIn: '5d' }
            )        
            const response = NextResponse.json({
                message:"Successfully Login Admin",
                success:true
            },{
                status:200
            })
            response.cookies.set("token" , tokan ,{
                httpOnly:true
            })
            return response
        }else{
            return NextResponse.json({
                message:"Something Went Wrong"
            },{
                status:500
            })
        }
    }catch (err : unknown ){
        const error = err as Error
        return NextResponse.json({
            message : error.message
        },{
            status:500
        })
    }
} 

