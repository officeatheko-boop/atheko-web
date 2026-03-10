"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Trash2 ,UserRoundPen   } from "lucide-react"
import Image from "next/image"
import { Roboto  , Inter} from 'next/font/google';




const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  });

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'], 
  });




export interface Banner{
    _id:string,
    bannerImage:{
        url:string,
        public_id:string
    },
    bannerTitle:string,
    bannerSubTitle:string,
    bannerDescription:string,
    created_at:string
}




export const columns: ColumnDef<Banner>[] = [
  {
    accessorKey: "bannerTitle",
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Banner Title
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.bannerTitle}</div>
  },
  {
    accessorKey: "bannerSubTitle", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Banner Sub Title
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.bannerSubTitle}</div>
  },
  {
    accessorKey: "bannerDescription", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Banner Description
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.bannerDescription}</div>
  },
  {
    accessorKey: "bannerImage", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Banner Image
                  </div>,
    cell: ({ row }) => {
      const imageUrl = row.original.bannerImage.url; 
      return (
        <Image
          src={imageUrl}
          alt="Service"
          width={48} 
          height={48} 
          className="rounded object-cover"
        />
      );
    },
  },
  {
    accessorKey:"Actions",
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Actions 
                  </div>,
    cell: ({})=> {
        return (
            <div className=" flex justify-center items-center hover: cursor-pointer " >
                <UserRoundPen />
                <Trash2  />
            </div>
        )
    }
  }
]
