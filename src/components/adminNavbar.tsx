'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleChevronDown , LogOut } from 'lucide-react'
import axios from 'axios'
import {  toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



function AdminNavbarPage() { 
  const router = useRouter()
  
  const LogoutFunction = async () => {
      try{
        const response = await axios.get(`/api/logout/`)
        if(response.status ===  200){
          toast.success('Logout Successful');
          router.push('/login')
        }   
      }catch(error : unknown){
        if(error instanceof Error){
          toast.error(error.message);          
        }else{
          toast.error("Something Went Wrong");          
        }
      }
  }

  return (

    <nav className=" rounded-2xl mt-1  w-full bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] dark:bg-neutral-700 py-2 px-4 shadow-md">
      <div className="flex justify-end items-center"> 
        <Avatar>
          <AvatarImage src={"/core/Atheko-2.svg"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            <CircleChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
              <DropdownMenuItem className=' hover:cursor-pointer ' onClick={() => LogoutFunction()} >
                <LogOut />
                  LogOut
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
    
  )
}

export default AdminNavbarPage