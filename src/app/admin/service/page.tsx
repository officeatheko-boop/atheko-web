'use client'

import AdminLayout from "@/components/layout/adminLayout"
import { Service, columns as baseColumns } from "./columns"
import { DataTable } from "../../../components/data-table"
import React, {  useEffect, useMemo, useState } from 'react'
import axios from "axios"
import { Button } from "@/components/ui/button"
import AddServiceModal from "./add-service-modal"
import DeleteModal from "@/components/custom/DeleteModal"
import EditServiceModal from "./edit-service-modal"
import { Service_ } from "@/types/type"
import { editService } from "./edit-service-modal"
import { toast } from "sonner"
import { Inter} from 'next/font/google';




const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  });





export default  function AdminServicePage() {

    const [datas , setData] = useState<Service[]>([]);
    const [isopen , setIsopen] = useState(false)
    const[editIsOpen , setEditIsOpen] = useState(false)
    const [deleteOpen , setDeleteOpen] = useState(false)
    const [serviceId , setServiceid] = useState("")
    const [editserviceName , setServiceName]  = useState("")
    const [editservicePoints , servicePoints]  = useState([""])
    const [editserviceDescription , setServiceDescription]  = useState("")
    const [editserviceImage , setServiceImage]  = useState("")
    const [editserviceBanner , setServiceBanner]  = useState("")



    useEffect(() => {
        const getFetch = async () => {
            try{
                const response = await axios.get('/api/services/')
                if(response.status === 200){
                    setData(response.data['data']) 
                }
            }catch (error : unknown){
                console.log(error)
            }
        }
        getFetch()
    },[])

    function isFile(value: unknown): value is File {
    return value instanceof File;
    }

    
    const handleSubmit = async (values: Service_) => {
        try{            
          const formData = new FormData()
          formData.append("serviceName",values.serviceName)
          formData.append("servicePoints",JSON.stringify(values.servicePoints))
          formData.append("serviceDescription",values.serviceDescription) 
          if(isFile(values.serviceImage)){
              formData.append("serviceImage",values.serviceImage)
          }
          if(isFile(values.serviceBanner)){
              formData.append("serviceBanner",values.serviceBanner)
          }
          const response = await axios.post(`/api/services/`,formData,{headers: {'Content-Type': 'multipart/form-data'}
          });
          console.log("the response is the",response);
          
          if(response.status === 201){
            const responseData = response.data 
            setData((prev) => [...prev , responseData['data']])
            setIsopen(false)    
            toast.success("Successfully added a new service")
            
          }    
        }catch(error : unknown){ 
            if(error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Something Went Wrong Please Try Again.")                            
            }
        }
    }



    const handleEditAPI = async (values : editService) => {

        const formData = new FormData()
        formData.append("serviceName",values.serviceName)
        if(values.servicePoints){
            formData.append("servicePoints",JSON.stringify(values?.servicePoints))
        }
        formData.append("serviceDescription",values.serviceDescription)
        if(values.serviceImage &&  typeof values.serviceImage === 'object'){ 
            console.log('working');
            console.log(typeof values.serviceImage);
            formData.append("serviceImage",values.serviceImage)
        }else{
            formData.append("serviceImage","")
        }
        if(values.serviceBanner &&  typeof values.serviceBanner === 'object'){ 
            console.log('working');
            console.log(typeof values.serviceBanner);
            formData.append("serviceBanner",values.serviceBanner)
        }else{
            formData.append("serviceBanner","")
        }
        try{
            const response = await axios.put(`/api/services/${serviceId}`,formData)
            if(response.status === 200){
                const responseData = response.data['data']
                setData((prevServices) =>
                    prevServices.map((service) =>
                        service._id === responseData._id ? responseData : service
                    )
                );
                setEditIsOpen(false)
                toast.success("Successfully edited service")
            }
        }catch(error : unknown){
            if(error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Something Went Wrong Please Try Again.")                            
            }
        }
        
    }

    
    const handleDeleteAPI = async (conform : string) => {
        if(conform === "no"){
            setDeleteOpen(false)
            setServiceid("")
        }else if (conform === "yes"){
            try{
                const response = await axios.delete(`/api/services?id=${serviceId}`)
                if(response.status === 200){
                    console.log("usccess")
                    setData((prev) => prev.filter((data) => data._id !== serviceId))
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
    
  
  
    const onEdit = (service : Service) => {
        const id = service._id;
        if(id && service){
            setServiceid(id)
            setServiceName(service.serviceName)
            servicePoints(service.servicePoints)
            setServiceDescription(service.serviceDescription)
            setServiceImage(service.serviceImage.url)
            setServiceBanner(service.serviceBanner.url)
            setEditIsOpen(true)
        }
    }



    const onDelete =  async (service : Service) => {
        const id = service._id;
        if(id){
            setServiceid(id)
            setDeleteOpen(true)
        }
    } 



  const columns = useMemo(() => baseColumns({onDelete , onEdit}),[]);



  return (
    <AdminLayout> 



    
    <div className="container mx-auto py-10">
        <div className=" flex justify-end mb-2" >
            <Button  className={`${inter.className}  bg-[rgb(180,4,252)] hover:bg-[rgb(180,4,252)]  `}  onClick={() => setIsopen(true)}>Add New Service</Button>
        </div>
      <DataTable columns={columns} data={datas} />
     <AddServiceModal 
        isopen={isopen}
        onClose={()=> setIsopen(false)}
        onSubmit={handleSubmit}
     />  
     <DeleteModal
        isopen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConform={handleDeleteAPI}
      />

    <EditServiceModal
        isopen={editIsOpen}
        onClose={() => setEditIsOpen(false)}
        onConform={handleEditAPI}
        servicename={editserviceName}
        servicedescription={editserviceDescription}
        servicepoints={editservicePoints}
        serviceimage={editserviceImage}
        servicebanner={editserviceBanner}
        serviceId={serviceId}
    />  

    </div>
    </AdminLayout>
  )
}
