"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Review } from '@/types/type'
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"


function dateFormat(date : string){
  const newDate = new Date(date)
  return newDate.toDateString()

}


type DeleteHandlerProps = {
  onDelete: (row : Review) => void;
};

export const getColumns = ({
  onDelete,
}: DeleteHandlerProps): ColumnDef<Review>[] => [
  {
    accessorKey: "reviewText",
    header: "Customer Review",
  },
   {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const formatedDate = dateFormat(row.getValue("created_at"))
      return <div className="font-medium">{formatedDate}</div>
    },
  },
  {
    id: 'actions',
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
];