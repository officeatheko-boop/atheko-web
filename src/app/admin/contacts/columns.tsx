"use client"
import DataTableRowActionsContact from "@/components/DataTableRowActionContact"
import { ColumnDef } from "@tanstack/react-table"


import { Roboto  , Inter} from 'next/font/google';




const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  });

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'], 
  });


export interface Contact{
    _id:string,
    fullName:string,
    number:string,
    email:string,
    message:string,
    created_at:string
}


interface ContactColumnProps{
  onDelete : (Service : Contact) => void;
}

function dateFormat(date : string){
  const newDate = new Date(date)
  return newDate.toDateString()

}

export const columns = ({onDelete }: ContactColumnProps) : ColumnDef<Contact>[] => [
  {
    accessorKey: "fullName",
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Full Name
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.fullName}</div>

  },
  {
    accessorKey: "number", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Phone Number
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.number}</div>
  },
  {
    accessorKey: "email", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Email
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.email}</div>
  },
  {
    accessorKey: "message", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Message
                  </div>,
    cell :  ({row}) => <div className={`${roboto.className}`} >{row.original.message}</div>

  },
  {
    accessorKey: "created_at", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Creation Time
                  </div>,
    cell:({row}) => {
      // const formattedDate = new Date(row.original.created_at).toUTCString(); 
      const newDate = dateFormat(row.original.created_at)
      return (
        <div className="font-medium">{newDate}</div>
      );
    }
  },
  {
    id:"actions", 
    header: () => <div className={`${inter.className}   font-extrabold  text-black `} >
                    Delete
                  </div>,
    cell: ({row})=> <DataTableRowActionsContact row={row} onDelete={onDelete}  />
  },
]
