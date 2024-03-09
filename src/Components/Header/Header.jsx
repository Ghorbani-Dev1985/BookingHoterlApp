import React, { useState } from 'react'
import { Add, CalendarMonth, FmdGood, Remove, Search } from '@mui/icons-material'
import { Divider } from '@mui/material'

const Header = () => {
    const [destination, setDestination] = useState('')
    const [openOption, setOpenOption] = useState(false)
    const [options , setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
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
             <div className='flex-center h-11 gap-2 relative cursor-pointer'>
               <div onClick={() => setOpenOption(!openOption)} > 1 adult &bull; 2 children &bull; 1 room</div>
                 {
                    openOption && 
                   <GuestOptionList options={options}/>
                 }
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

function GuestOptionList(){
    return(
    <div className='w-full absolute top-12 bg-slate-800 border border-slate-600 p-2 rounded-lg'>
        <div className='flex flex-col gap-5'>
          <OptionItem />
          <OptionItem />
          <OptionItem />
        </div>
   
</div>
    )
}

function OptionItem(){
    return(
    <div className='flex-between'>
            <span className='flex flex-1'>Adult</span>
            <div className='flex-center'>
              <button className='bg-white/90 flex-center rounded-lg size-6 text-gray-900'><Remove className='size-4'/></button>
              <span className='px-2'>1</span>
              <button className='bg-white/90 flex-center rounded-lg size-6 text-gray-900'><Add className='size-4'/></button>
            </div>
          </div>
    )
}