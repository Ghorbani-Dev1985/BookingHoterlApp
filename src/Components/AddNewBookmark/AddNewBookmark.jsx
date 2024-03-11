import { ArrowBack, Domain, Done, Flag } from '@mui/icons-material';
import { Divider } from '@mui/material';
import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useUrlLocation from '../../Hooks/useUrlLocation';

const AddNewBookmark = () => {
    const navigate = useNavigate()
    const [lat , lng] = useUrlLocation()
    console.log(lat , lng)
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
            CityName: "",
            Country: '',
          },
        }
      );
  return (
    <>
     <h2 className='tracking-widest flex items-center'><Done className="text-emerald-500 mr-1" />Bookmark New Location</h2>
     <Divider className='border-gray-600'/>
     <form>
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
                    value: 10,
                    message: "Please enter a maximum of 10 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]{3,10}$/g,
                    message: "Please enter just a-zA-Z",
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
            <Flag className="absolute right-2.5 sm:right-3.5 top-2" />
              <input
                {...register("Country", {
                  required: "Country is required",
                  minLength: {
                    value: 3,
                    message: "Please enter at least 3 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Please enter a maximum of 10 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]{3,10}$/g,
                    message: "Please enter just a-zA-Z",
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
                navigate(-1)
            }}
            className="bg-transparent border border-slate-600 h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full "
          >
            <ArrowBack />
            Back
          </button>
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-600 transition-colors h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={(!formState.isValid)}
          >
            Add New Bookmark
          </button>
            </div>
     </form>
    </>
  )
}

export default AddNewBookmark