import React, { useState } from 'react'
import { CalendarMonth, FmdGood, Search } from '@mui/icons-material'
import { Divider } from '@mui/material'

const Header = () => {
    const [destination, setDestination] = useState('')
  return (
    <header>
        <div className='container'>
           <div className='flex-between my-4 border border-gray-700 p-5 rounded-xl'>
             {/* Search Input */}
             <div className='flex-between gap-2'>
                <FmdGood className='text-rose-500'/>
                <input value={destination} onChange={(e) => setDestination(e.target.value)} type="text" className='border-0' placeholder='Where are you going?' />
                <Divider orientation="vertical" className='border-gray-600' variant="middle" flexItem />
             </div>
             {/* Date Picker */}
             <div className='flex-between h-11 gap-2'>
                <CalendarMonth className='text-blue-400'/>
                <p>
                    2024-01-01
                </p>
             <Divider orientation="vertical" className='border-gray-600' variant="middle" flexItem /> 
             </div>
             {/* Drop Down */}
             <div className='flex-center h-11 gap-2'>
               <p> 1 adult &bull; 2 children &bull; 1 room</p>
                <Divider orientation="vertical" className='border-gray-600' variant="middle" flexItem /> 
             </div>
             {/* Search Btn */}
             <div>
                <button className='bg-orange-400 rounded-xl py-1 px-2'>
                    <Search />
                </button>
             </div>
           </div>
        </div>
    </header>
  )
}

export default Header