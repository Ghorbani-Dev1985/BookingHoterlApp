import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <section className='container'>
        <div className="grid grid-cols-12 gap-3 border border-gray-600 rounded-xl p-2">
             <div className='col-span-12 md:col-span-5'>
              <Outlet />
             </div>
             <aside className='col-span-12 md:col-span-7'>
cc
             </aside>
        </div> 
    </section>
  )
}

export default AppLayout