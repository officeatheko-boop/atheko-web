'use server'

import ConnectMongodb from "@/lib/mongo";
import Contact from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export interface ContactFormDataType {
    fullName : string,
    email :  string , 
    number : string,
    message : string 
}



await ConnectMongodb() 

export async  function POST(request:NextRequest) {
    try{

        const contactForm : ContactFormDataType =    await  request.json();
        const {fullName  , email , number , message} =  contactForm
        const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const number_regex =  /^\+?[1-9]\d{1,14}$/;
        if(!fullName){
            return NextResponse.json({
                "message":"Full Name is Required"
            },{
                status:400
            })
        }
        if(!email){
            return NextResponse.json({
                message:"Email is Required"
            },{
                status:400
            })
        }else if(regex_email.test(email) === false){
            return NextResponse.json({
                message:"Please Enter Correct Email"
            },{
                status:400
            }) 
        }
        if(!number){
            return NextResponse.json({
                message:"Phone Number is Required"
            },{
                status:400
            })
        }else if (number_regex.test(number) === false){
            return NextResponse.json({
                message:"Please Enter Correct Phone Number"
            },{
                status:400
            })
        }
        if(!message){
            return NextResponse.json({
                message:"Message is Required"
            },{
                status:400
            })
        }
        const newContact =  await new Contact({
            fullName,
            email,
            number,
            message
        })
        newContact.save()
        const date = new Date();
        const htmlContent = `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Compunknown Name</title>
                </head>
                <body bgcolor="#9208f4" style="margin-top:20px;margin-bottom:20px">
                <!-- Main table -->
                <table border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="white" width="650">
                    <tr>
                    <td>
                        <!-- Child table -->
                        <table border="0" cellspacing="0" cellpadding="0" style="color:#0f3462; font-family: sans-serif;">
                        <tr>
                            <td>
                            <h2 style="text-align:center; margin: 0px; padding-bottom: 25px; margin-top: 25px;">
                                <i style="color: #9208f4;" >Athe</i><span style="color:#9208f4">Ko</span></h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <img src="https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899174.jpg?t=st=1732901577~exp=1732905177~hmac=38da48503d12d96c441de3a13415ca73bb032a14fff02d69bd66700167c23bc2&w=996" height="50px" style="display:block; margin:auto;padding-bottom: 25px; ">
                            </td>
                        </tr>
                        <tr>
                            <td style=" text-align: center;  ">
                            <h1 style="margin: 0px;padding-bottom: 25px; text-transform: uppercase;">A New Contact Has Reached Out</h1>
                            <p style=" margin: 0px 40px;padding-bottom: 25px;line-height: 2; font-size: 15px;">
                            Full Name : ${fullName}
                            <br/>
                            Email : ${email}
                            <br/>
                            Number : ${number}
                            </p>
                            <p style=" margin: 0px 32px;padding-bottom: 25px;line-height: 2; font-size: 15px;">
                                Message : ${message}
                            </p>
                            <h2 style="margin: 0px; padding-bottom: 25px;">Date: ${date} </h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <button type="button" style="background-color:#9208f4; color:white; padding:15px 97px; outline: none; display: block; margin: auto; border-radius: 31px;
                                                font-weight: bold; margin-top: 25px; margin-bottom: 25px; border: none; text-transform:uppercase; ">Get Toch</button>
                            </td>
                        </tr>
                        </table>
                        <!-- /Child table -->
                    </td>
                    </tr>
                </table>
                <!-- / Main table -->
                </body>

                </html>`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD,
            },
          });
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to : process.env.SMTP_EMAIL,
            subject : `Message From ${fullName}`,
            html:htmlContent,
        };
        await transporter.sendMail(mailOptions);
        return NextResponse.json({
            message:"Successfully Saved Contact"
        },{
            status:201
        })

    } catch (err : unknown){
        const error = err as Error
        return NextResponse.json({
            message : error.message
        },{
            status:500
        })
    }
}


export async function GET(){
    try{
        const contacts = await Contact.find()
        return NextResponse.json({
            data:contacts
        },{
            status:200
        })
    }catch (err : unknown){
        const error  = err as Error
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
        const contact = await Contact.findById({_id : id}) 
        if(contact){
            await Contact.deleteOne({_id : id})
                return NextResponse.json({
                    message:"Successfully Deleted Service"
                },{
                    status:200
                })
        }else{
            return NextResponse.json({
            message:"Contact Not Found, Please Try Again Valid Contact"
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
