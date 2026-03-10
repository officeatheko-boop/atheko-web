"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BookType } from "@/types/type"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"



function dateFormat(date : string){
  const newDate = new Date(date)
  return newDate.toDateString()

}


type DeleteHandlerProps = {
  onDelete: (row : BookType) => void;
};



export const getColumns = ({
  onDelete,
}: DeleteHandlerProps): ColumnDef<BookType>[] => [
  {
    accessorKey: "username",
    header: "Customer Name",
  },
  {
    accessorKey: "number",
    header: "Customer Number",
  },
  {
    accessorKey: "place",
    header: "Customer Place",
  },
  {
    accessorKey: "scheduledDate",
    header: "Schedule Date",
    cell: ({ row }) => {
      const formatedDate = dateFormat(row.getValue("scheduledDate"))
      return <div className="text-right font-medium">{formatedDate}</div>
    }
  },
  {
    accessorKey: "scheduledTime",
    header: "Schedule Time",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "commands",
    header: "Customer Commands",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const formatedDate = dateFormat(row.getValue("created_at"))
      return <div className="text-right font-medium">{formatedDate}</div>
    },
  },
  {
    accessorKey: "actions",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <Button
          variant='ghost'
          className='h-8 w-8 p-0'
          onClick={() => onDelete(row.original)}
        >
          <Trash2 color="red" className='h-4 w-4' />
        </Button>
      );
    },
  },

]