"use client"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import DataTableRowActions from "@/components/DataTableRowAction"
import { Roboto  , Inter} from 'next/font/google';




const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  });

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'], 
  });


export interface Service{
    serviceImage:{
        url:string,
        public_id:string
    },
    serviceBanner:{
      url:string,
      public_id:string
    },  
    _id:string,
    serviceName:string,
    servicePoints:string[],
    serviceDescription:string,
    created_at:string,
    isActive:boolean,
}


interface ServiceColumnProps{
  onDelete : (Service : Service) => void;
  onEdit: (Service : Service) => void
}





export const columns = ({onDelete , onEdit}: ServiceColumnProps) : ColumnDef<Service>[] => [
  {
    accessorKey: "serviceName",
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Service Name
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.serviceName}</div>
  },
  {
    accessorKey: "serviceDescription", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Service Description
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.serviceDescription}</div>
  },
  {
    accessorKey: "serviceImage",
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Service Image
                  </div>,
    cell: ({ row }) => {
      const imageUrl = row.original.serviceImage.url; 
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
    accessorKey: "serviceBanner",
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Service Banner
                  </div>,
    cell: ({ row }) => {
      const imageUrl = row.original.serviceBanner.url; 
      return (
        <Image
          src={imageUrl}
          alt="Service Banner"
          width={48} 
          height={48} 
          className="rounded object-cover"
        />
      );
    },
  },
  {
    id:"actions",
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Actions
                  </div>,
    cell: ({row})=> <DataTableRowActions row={row} onDelete={onDelete} onEdit={onEdit} />
  },
]
