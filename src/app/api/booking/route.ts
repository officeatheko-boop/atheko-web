'use server'

import ConnectMongodb from "@/lib/mongo";
import Booking from "@/models/book";
import { NextRequest, NextResponse } from "next/server";
import { BookType } from "@/types/type";
import nodemailer from 'nodemailer';
import Service from "@/models/service";




await ConnectMongodb() 

export async function POST(request:NextRequest) {
    if(request){
        try{

            const data : BookType =    await  request.json(); 
            const {username , number , place , scheduledDate , scheduledTime , commands , service } = data  
            if(!service){
                return NextResponse.json({
                    "message":"Service is not Found"
                },{
                    status:400
                }) 
            }
            const service_id = await Service.findById({_id : service})
            console.log(service_id,"the service id ")
            if(!service_id){
               return NextResponse.json({
                    "message":"Service is not Found"
                },{
                    status:400
                }) 
            }
            const number_regex =  /^\+?[1-9]\d{1,14}$/;
            if(!username){
                return NextResponse.json({
                    "message":"Name is Required"
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
            }
            if(number_regex.test(number) === false){
                return NextResponse.json({
                    message:"Please Enter Correct Phone Number"
                },{
                    status:400
                })   
            }
            if(!place){
                return NextResponse.json({
                    message:"Location is Required"
                },{
                    status:400
                })      
            }
            if(!scheduledDate){
                return NextResponse.json({
                    message:"Schedule Date is Required"
                },{
                    status:400
                })   
            }
            if(!scheduledTime){
                return NextResponse.json({
                    message:"Schedule Time is Required"
                },{
                    status:400
                })   
            }
            const newContact =  await new Booking({
                username,
                number,
                place,
                scheduledDate,
                scheduledTime,
                commands,
                services : service
            })
            console.log("the new bok",newContact)
            await newContact.save()

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
                                <h1 style="margin: 0px;padding-bottom: 25px; text-transform: uppercase;">A New Booking Has Reached Out</h1>
                                <p style=" margin: 0px 40px;padding-bottom: 25px;line-height: 2; font-size: 15px;">
                                Full Name : ${username}
                                <br/>
                                Number : ${number}
                                <br/>
                                Schedule Date : ${scheduledDate}
                                <br/>
                                Schedule Time : ${scheduledTime}
                                </p>
                                commands : ${commands}
                                </p>
                                <p style=" margin: 0px 32px;padding-bottom: 25px;line-height: 2; font-size: 15px;">
                                    Schedule a Service : ${service_id.serviceName}
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
                subject : `Booking For ${username}`,
                html:htmlContent,
            };
            await transporter.sendMail(mailOptions);
            return NextResponse.json({
                message:"Successfully Booked Service"
            },{
                status:201
            })
        }catch(err : unknown){
            const error = err as Error
            return NextResponse.json({
                message : error.message
            },{
                status:500
            })
        }
    }else{
        return NextResponse.json({
            message:"Something Went Wrong, Please try again later"
        },{
            status:400
        })
    }
}



export async function GET() {
  try {
    const bookings = await Booking.find();

    const final_data = await Promise.all(
      bookings.map(async (booking) => {
        const service = await Service.findOne({ _id: booking.services });

        return {
          ...booking.toObject(), 
          service: service?.serviceName || "Unknown Service", 
        };
      })
    );

    return NextResponse.json(
      { data: final_data },
      { status: 200 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}




export async function DELETE(request:NextRequest) {
    try{    
        const id = await request.nextUrl.searchParams.get("id")
        const booking = await Booking.findById({_id : id}) 
        if(booking){
            await Booking.deleteOne({_id : id})
                return NextResponse.json({
                    message:"Successfully Deleted Booking"
                },{
                    status:200
                })
        }else{
            return NextResponse.json({
            message:"Please Try Again Valid Contact"
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
