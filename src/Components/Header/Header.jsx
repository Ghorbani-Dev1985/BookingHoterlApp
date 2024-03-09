import React, { useRef, useState } from 'react'
import { Add, CalendarMonth, FmdGood, RadioButtonChecked, Remove, Search } from '@mui/icons-material'
import { Divider } from '@mui/material'
import useOutsideClick from '../../Hooks/useOutsideClick'

const Header = () => {
    const [destination, setDestination] = useState('')
    const [openOption, setOpenOption] = useState(false)
    const [options , setOptions] = useState({
        Adult: 1,
        Children: 0,
        Room: 1
    })
    const HandleOption = (name , operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name] : operation === 'inc' ? options[name] + 1 : options[name] - 1
            }
        })
    }
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
               <div id="OptionDropdown" className='flex-center gap-1' onClick={() => setOpenOption(!openOption)} > <span className='text-emerald-500'>{options.Adult}</span> Adult <RadioButtonChecked className='size-4'/> <span className='text-emerald-500'>{options.Children}</span> Children <RadioButtonChecked className='size-4'/> <span className='text-emerald-500'>{options.Room}</span> Room</div>
                 {
                    openOption && 
                   <GuestOptionList options={options} setOpenOption={setOpenOption} HandleOption={HandleOption}/>
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

function GuestOptionList({options , HandleOption , setOpenOption}){
    const optionsRef = useRef()
    useOutsideClick(optionsRef, "OptionDropdown" , () => setOpenOption(false))
    return(
    <div className='w-full absolute top-12 bg-slate-800 border border-slate-600 p-2 rounded-lg'>
        <div ref={optionsRef} className='flex flex-col gap-5'>
          <OptionItem type='Adult' options={options} minLimit={1} HandleOption={HandleOption}/>
          <OptionItem type='Children' options={options} minLimit={0} HandleOption={HandleOption}/>
          <OptionItem type='Room' options={options} minLimit={1} HandleOption={HandleOption}/>
        </div>
   
</div>
    )
}

function OptionItem({options , type , minLimit , HandleOption}){
    return(
    <div className='flex-between'>
            <span className='flex flex-1'>{type}</span>
            <div className='flex-center'>
              <button onClick={() => HandleOption(type , 'dec')} disabled={options[type] <= minLimit} className='bg-white/90 disabled:cursor-not-allowed disabled:opacity-30 flex-center rounded-lg size-6 text-gray-900'><Remove className='size-4'/></button>
              <span className='px-2'>{options[type]}</span>
              <button onClick={() => HandleOption(type , 'inc')} className='bg-white/90 flex-center rounded-lg size-6 text-gray-900'><Add className='size-4'/></button>
            </div>
          </div>
    )
}