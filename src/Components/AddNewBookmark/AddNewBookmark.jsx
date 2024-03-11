import { ArrowBack, Domain, Done, Flag } from '@mui/icons-material';
import { CircularProgress, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useUrlLocation from '../../Hooks/useUrlLocation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactCountryFlag from 'react-country-flag';
import { useBookmarks } from '../Context/BookmarkListContext';

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

const AddNewBookmark = () => {
    const navigate = useNavigate()
    const [lat , lng] = useUrlLocation()
    const {createBookmark , isLoading} = useBookmarks()
    const [countryCode , setCountryCode] = useState('')
    const [isLoadingGeoCoding , setIsLoadingGeoCoding] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        isDirty,
        isValid,
        formState,
      } = useForm(
        {
          mode: "all",
        },
        {
          defaultValues: {
            CityName: '',
            Country: '',
          },
        }
      );
      useEffect(() => {
        if(!lat || !lng) return
        async function fetchLocationData(){
        setIsLoadingGeoCoding(true)
       const req = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
       .then((response) => {
      if(response.data.countryCode){
          reset({
           CityName: response.data.city || response.data.locality || "",
           Country: response.data.countryName
         });
          setCountryCode(response.data.countryCode)
      }else{
        toast.error("This location isn't a city! Please click on somewhere else")
        reset({
            CityName: "",
          });
      }
       setIsLoadingGeoCoding(false)
       })
       .catch((error)=>{
        toast.error(error.message)
        setIsLoadingGeoCoding(false)
       })
        }
        fetchLocationData()
      }, [lat , lng])
     
      const AddNewBookmarkHandler = async (data , e) => {
        e.preventDefault()
        const newBookmarkInfos = {
            cityName: data.CityName,
            country: data.Country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: data.CityName + " " + data.Country
        }
       await createBookmark(newBookmarkInfos)
       reset()
      }

      if(isLoadingGeoCoding) return <CircularProgress />
  return (
    <>

     <h2 className='tracking-widest flex items-center'><Done className="text-emerald-500 mr-1" />Bookmark New Location</h2>
     <Divider className='border-gray-600'/>
     <form onSubmit={handleSubmit(AddNewBookmarkHandler)}>
        {/* CityName */}
            <label className='block mb-2'>CityName</label>
        <div className="relative">
            <Domain className="absolute right-2.5 sm:right-3.5 top-2" />
              <input
                {...register("CityName", {
                  required: "CityName is required",
                  minLength: {
                      value: 3,
                    message: "Please enter at least 3 characters",
                },
                maxLength: {
                    value: 30,
                    message: "Please enter a maximum of 30 characters",
                },
                })}
                className={`${
                  errors.CityName && "border border-rose-500"
                } outline-none`}
                placeholder="CityName*"
                />
            </div>
            <span className="block font-sans text-rose-500 text-sm my-2">
              {errors.CityName && errors.CityName.message}
            </span>
            {/* Country */}
            <label className='block mb-2'>Country</label>
        <div className="relative">
          {countryCode ? <ReactCountryFlag svg countryCode={countryCode} className="absolute right-2.5 sm:right-3.5 top-3"/> : <Flag className="absolute right-2.5 sm:right-3.5 top-2" />} 
            
              <input
                {...register("Country", {
                  required: "Country is required",
                  minLength: {
                    value: 3,
                    message: "Please enter at least 3 characters",
                  },
                  maxLength: {
                    value: 60,
                    message: "Please enter a maximum of 60 characters",
                  },
                })}
                className={`${
                  errors.Country && "border border-rose-500"
                } outline-none`}
                placeholder="Country*"
              />
            </div>
            <span className="block font-sans text-rose-500 text-sm my-2">
              {errors.Country && errors.Country.message}
            </span>
            <div className='flex flex-between gap-5'>
            <button
            onClick={(e) => {
                e.preventDefault()
                navigate('/bookmark')
            }}
            className="bg-transparent border border-slate-600 h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full "
            >
            <ArrowBack />
            Back
          </button>
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-600 transition-colors h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={(!formState.isValid || isLoading)}
            >
           {isLoading ? <CircularProgress className='text-white !size-6'/> : "Add New Bookmark"} 
          </button>
            </div>
     </form>
    
    </>
  )
}

export default AddNewBookmark