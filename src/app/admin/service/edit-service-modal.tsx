'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Service } from './columns'
import Image from 'next/image'

  
export  interface editService {
  _id : string | null,
  serviceName : string,
  serviceImage : string | File,
  serviceBanner : string | File,
  serviceDescription: string,
  servicePoints:string[],
  created_at? : string | null,
  isActive?: string | null
}

function EditServiceModal({isopen, onClose , onConform ,  servicename , servicedescription , servicepoints , serviceimage , servicebanner , serviceId }:
  {isopen : boolean ; onClose : () => void; onConform : (serviceData : editService) => void;  servicename : string , servicedescription:string , servicepoints : string[] , serviceimage: File | string , servicebanner: File | string , serviceId:  string }) 
  {
    

      const [editservice_id , setServiceId]  = useState(serviceId)
      // const [editservicecreated , setServiceCreatedAt]  = useState(servicename)
      // const [editserviceIsActive , setServiceIsActive]  = useState(servicename)
      const [editserviceName , setServiceName]  = useState(servicename)
      const [editservicePoints , setServicePoints]  = useState(servicepoints)
      const [editserviceDescription , setServiceDescription]  = useState(servicedescription)
      const [editserviceImage , setServiceImage]  = useState(serviceimage)
      const [editserviceBanner , setServiceBanner]  = useState(servicebanner)
      const [showeditserviceImage , setShowServiceImage]  = useState(serviceimage)
      const [showeditserviceBanner , setShowServiceBanner]  = useState(servicebanner)

    useEffect(()=> {
      setServiceId(serviceId)
      setServiceName(servicename)
      setServiceDescription(servicedescription)
      setServicePoints(servicepoints)
      setServiceImage(serviceimage)
      setServiceBanner(servicebanner)
      setShowServiceImage(serviceimage)
      setShowServiceBanner(servicebanner)
    },[servicename,servicepoints,servicedescription,serviceimage , servicebanner , serviceId])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);

      if (name === "serviceImage") {
        setServiceImage(file);
        setShowServiceImage(fileURL);
      } else if (name === "serviceBanner") {
        setServiceBanner(file);
        setShowServiceBanner(fileURL);
      }
    }
  };


    const handleSave = () => {
        console.log(typeof editserviceImage);
        console.log(editserviceImage);
        
      const serviceData : editService = { 
        _id:editservice_id,
        serviceName : editserviceName,
        serviceDescription : editserviceDescription,
        servicePoints : editservicePoints,
        serviceImage : editserviceImage,
        serviceBanner : editserviceBanner,
      }
      if(serviceData){
        onConform(serviceData as unknown as editService)
      }else{
        console.log("null getting")
      }
    }

    console.log(servicepoints)

  return (
    <Dialog open={isopen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogDescription>
          Make changes to your service here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="serviceName" className="text-right">
            serviceName
          </Label>
          <Input
            id="serviceName"
            type='text'
            value={editserviceName}
            className="col-span-3"
            onChange={(e) => setServiceName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="serviceDescription" className="text-right">
            Description
          </Label>
          <Input
            id="serviceDescription"
            type='text'
            value={editserviceDescription}
            className="col-span-3"
            onChange={(e) => setServiceDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="serviceImage" className="text-right">
            serviceImage
          </Label>
          <Input
            type="file"
            accept="image/*"  
            id="serviceImage"
            name="serviceImage"
            className="col-span-2"
            onChange={(e) =>
              handleFile(e)
            }
          />
          <Image  
          src={showeditserviceImage as string} 
          width={50}    
          height={50} 
          className="rounded object-cover"  
          alt='service-image' />
        </div> 

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="serviceImage" className="text-right">
            serviceImage
          </Label>
          <Input
            type="file"
            accept="image/*"  
            id="serviceBanner"
            name="serviceBanner"
            className="col-span-2"
            onChange={(e) =>
              handleFile(e)
            }
          />
          <Image  
          src={showeditserviceBanner as string} 
          width={50}    
          height={50} 
          className="rounded object-cover"  
          alt='service-image' />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSave} type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default EditServiceModal