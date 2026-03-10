import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import AdminNavbarPage from "../adminNavbar"


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <AppSidebar />
          <SidebarTrigger />
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <AdminNavbarPage />
          <main className="flex-1 w-full p-4 overflow-x-auto">
            <div className="min-w-[800px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
