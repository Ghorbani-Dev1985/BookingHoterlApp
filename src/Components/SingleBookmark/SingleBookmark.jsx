import React, { useEffect } from 'react'
import { useBookmarks } from '../Context/BookmarkListContext'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import ReactCountryFlag from 'react-country-flag'

const SingleBookmark = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {getBookmark , isLoading , currentBookmark} = useBookmarks()
    useEffect(() => {
      getBookmark(id)
    },[id])

  return (
    <>
    <button onClick={() => navigate(-1)} className='flex gap-3 max-w-25 p-2 mb-5 rounded-xl border border-gray-700'><ArrowBack /> Back</button>
   { isLoading || !currentBookmark ? <CircularProgress /> : 
   (
    <div className='flex items-center border border-gray-700 p-2 rounded-xl gap-2'>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
    {currentBookmark.cityName}
    </div>
   )
    }
    </>
  )
}

export default SingleBookmark