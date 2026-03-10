'use client'
import AdminLayout from '@/components/layout/adminLayout'
import React, { useEffect, useState } from 'react'
import { DataTable } from "../../../components/data-table"
import { BookType } from '@/types/type'
import { getColumns  } from "./columns"
import axios from "axios"
import {  toast } from 'sonner';
import { getError } from "@/utils/helper"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"


export default  function AdminBookingPage() {
  const [data , setData] = useState<BookType[]>([]); 
    const [book ,setBookType ] = useState<BookType>()
    const [open , setOpen] = useState(false)

    useEffect(() => {
        const getFetch = async () => {
            try{
                const response = await axios.get('/api/booking/')
                if(response.status === 200){
                    setData(response.data['data']) 
                }
            }catch (error : unknown){
                console.log(error)
            }
        }
        getFetch()
    },[])


    const handleDelete = (row : BookType) => {
        setBookType(row)
        setOpen(true)
    };

    async function deleteBook(){
        const id = book?._id
        if(id){
          try{
            const response = await axios.delete(`/api/booking/?id=${id}`) 
            console.log(response);
            if(response.status === 200){
              toast.success('Successfuly Deleted');
              setData((prev) => prev.filter((data) => data._id !== id))
            }
          }catch (error : unknown){
            const message = getError(error)
            toast.error(message);
          }
        }
    } 

    const columns = getColumns({ onDelete: handleDelete }); 

  return (
    <AdminLayout>
        <DataTable columns={columns} data={data} /> 

        <AlertDialog open={open} onOpenChange={setOpen} >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this booking detail?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)} >Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBook} className="bg-red-600" >Continue</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

    </AdminLayout>

  )

}

