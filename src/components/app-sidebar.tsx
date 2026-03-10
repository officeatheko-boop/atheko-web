'use client'

import { BookCopy, Home, HandPlatter, Contact,Star} from "lucide-react"
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Inter} from 'next/font/google';




const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  });






const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Services",
    url: "/admin/service",
    icon: HandPlatter,
  },
  {
    title: "Booking",
    url: "/admin/booking",
    icon: BookCopy,
  },
  {
    title: "Contacts",
    url: "/admin/contacts",
    icon: Contact,
  },
  {
    title: "Reviews",
    url: "/admin/reviews",
    icon: Star,
  }
]


export function AppSidebar() {
  const pathname = usePathname()
  
  return (
    
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image
                alt="logo"
                src={"/core/Atheko-1.svg"}
                width={50}
                height={50}
                className="transition-transform duration-500 hover:scale-110"
              />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem  className={` mt-5 ${pathname === item.url ? " bg-[rgb(180,4,252)] text-white rounded-md h-8  hover:bg-[rgb(180,4,252)] hover:cursor-pointer  " : " text-black"}`} key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className={`${pathname === item.url ? "active" : ""}`} href={item.url}>
                      <item.icon   />
                      <span className={`${inter.className}  font-extrabold  text-sm  `} >{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
