'use client'
import AdminLayout from '@/components/layout/adminLayout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Banner, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<Banner[]> {
    try{
        const response = await axios.get('/api/banner/')
        if(response.status === 200){
            return response.data['data'] 
        }else{
            return []
        }
    }catch (error : unknown){
        console.log("the eror is the",error)
        return []
    }
}

function AdminBannerPage() {
    const [data , setData] = useState<Banner[]>([]);
    useEffect(() => {
        const loadData = async () => {
            const data_ = await getData()
            setData(data_)
        }
        loadData()
    },[])
  return (
    <AdminLayout>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </AdminLayout>
  )
}

export default AdminBannerPage