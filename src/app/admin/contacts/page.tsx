'use client'

import AdminLayout from "@/components/layout/adminLayout"
import { Contact, columns  as baseColumns } from "./columns"
import { DataTable } from "../../../components/data-table"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import ContactViewPage from "./contanctViewPage"
import { toast } from "sonner"


async function getData(): Promise<Contact[]> {
    try{
        const response = await axios.get('/api/contact')
        if(response.status === 200){
            return response.data['data'] 
        }else{
            return []
        }
    }catch (error : unknown){
        console.log(error)
        return []
    }
}

export default  function AdminContactPage() {
    const [data , setData] = useState<Contact[]>([]);
    const [contactId , setContact]  = useState<string>("")
    const [isClick , setIsClick] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            const data_ = await getData()
            setData(data_)
        }
        loadData()
    },[])


    const onDelete = (row : Contact) => {
        const id = row._id;
        if(row){
            setContact(id)
            setIsClick(true)
        }
    }
    

    const handleDeleteAPI = async (conform : string) => {
        if(conform === "no"){
            setIsClick(false)
            setContact("")
        }else if (conform === "yes"){
            try{
                const response = await axios.delete(`/api/contact?id=${contactId}`)
                if(response.status === 200){
                    console.log("usccess")
                    setData((prev) => prev.filter((data) => data._id !== contactId))
                    toast.success("Successfully deleted service")
                }
            }catch(error : unknown){
                if(error instanceof Error){
                    toast.error(error.message);
                }else{
                    toast.error("Something Went Wrong Please Try Again.")                            
                }
            }
    
        }
    }


    const columns = useMemo(() => baseColumns({onDelete}),[]);
    

  return (
    <AdminLayout>    
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <ContactViewPage isopen={isClick} onClose={() => setIsClick(false)} onConform={handleDeleteAPI} />
    </div>
    </AdminLayout>
  )
}
