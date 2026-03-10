import AdminLayout from '@/components/layout/adminLayout'
import React from 'react'
import { BarChartComponent   } from '@/components/charts/BarChart'
import { PieChartComponent } from '@/components/charts/PieChart'
import { ServiceChart } from '@/components/charts/ServiceCount'
import { ReviewChartComponent } from '@/components/charts/ReviewChart'



function AdminDashboard() {
  return (
    <AdminLayout> 
      <div className=' grid grid-cols-1   md:grid-cols-2  gap-4 w-full ' >
        <BarChartComponent />
        <PieChartComponent /> 
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 w-full ' >
        <ServiceChart /> 
        <ReviewChartComponent  />
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard