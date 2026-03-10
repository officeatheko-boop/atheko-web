'use client'
import AdminLayout from '@/components/layout/adminLayout'
import React, { useEffect, useState } from 'react'
import { DataTable } from "../../../components/data-table"
import { Review } from '@/types/type'
import { getColumns  } from "./columns"
import axios from "axios"
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
import { getError } from '@/utils/helper'
import {  toast } from 'sonner';



export default  function AdminReviewPage() {
  const [data , setData] = useState<Review[]>([]);
  const [review ,setReview ] = useState<Review>()
  const [open , setOpen] = useState(false)
    useEffect(() => {
        const getFetch = async () => {
            try{
                const response = await axios.get('/api/review/')
                if(response.status === 200){
                    setData(response.data['data']) 
                }
            }catch (error : unknown){
                console.log(error)
            }
        }
        getFetch()
    },[])
  const handleDelete = (row : Review) => {
    setReview(row)
    setOpen(true)
  };

  const columns = getColumns({ onDelete: handleDelete }); 


  async function handleDeleteFun(){
    const id = review?._id 
    console.log("the id ",id);
    if(id){
      try{
        const response = await axios.delete(`/api/review/?id=${id}`) 
        if(response.status == 200){
          toast.success('Successfuly Deleted');
          setData((prev) => prev.filter((data) => data._id !== id))
        }
        }catch (error : unknown){
          const message = getError(error)
          toast.error(message);
        }
      }else{  
        return false 
      }
  }

  return (
    <AdminLayout>
        <DataTable columns={columns} data={data} /> 

         <AlertDialog open={open} onOpenChange={setOpen} >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this Review detail?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)} >Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteFun} className="bg-red-600" >Continue</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

    </AdminLayout>

  )

}

