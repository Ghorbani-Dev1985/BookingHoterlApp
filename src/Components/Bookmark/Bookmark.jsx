import React from 'react'
import { useBookmarks } from '../Context/BookmarkListContext'
import { Divider } from '@mui/material';
import LocationSearchListLoading from '../../Components/Loading/LocationSearchListLoading'
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';


const Bookmark = () => {
    const {bookmarks , isLoading , currentBookmark , deleteBookmark} = useBookmarks()
    const DeleteBookmarkHandler = async (e , id) => {
      e.preventDefault()
      await deleteBookmark(id)
    }
    if(isLoading) return <LocationSearchListLoading listsToRender={bookmarks.length} />
  return (
    <>
    <h2>Your Bookmark <span className="flex-centre font-MorabbaBold bg-emerald-500 px-2 py-1 rounded-lg ml-2">{bookmarks.length}</span></h2>
    <Divider className="border-gray-600"/>
    {
    bookmarks.map(({ id,  host_location, cityName, latitude , longitude , countryCode }) => {
        return (
        <React.Fragment key={id}>
         <Link to={`${id}?lat=${latitude}&lng=${longitude}`}
    className={`${id === currentBookmark.id ? "border-emerald-500" : "border-gray-700"} flex flex-col px-2 items-center border rounded-lg shadow md:flex-row md:max-w-xl  bg-gray-800 hover:bg-gray-700`}
    >
      <div className='w-full h-full flex-between'>
    <div className="flex flex-col justify-between p-4 leading-normal">
      <h5 className="flex-center gap-2 mb-2 text-xl font-bold tracking-tight text-white">
        <ReactCountryFlag svg countryCode={countryCode}/>
        {host_location}
      </h5>
      <p className="mb-3 font-normal text-gray-400">{cityName}</p>
    </div>
    <button className='min-w-14 flex-center h-full' onClick={(e) => DeleteBookmarkHandler(e , id)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-rose-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

    </button>
      </div>
  </Link>
        </React.Fragment>
      );
    })
    }
    </>
    )
}

export default Bookmark