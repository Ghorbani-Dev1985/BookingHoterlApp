import React from 'react'
import { useBookmarks } from '../Context/BookmarkListContext'
import { Divider } from '@mui/material';
import LocationSearchListLoading from '../../Components/Loading/LocationSearchListLoading'
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';


const Bookmark = () => {
    const {bookmarks , isLoading , currentBookmark} = useBookmarks()
    console.log(bookmarks)
  return isLoading ? (
    <LocationSearchListLoading listsToRender={bookmarks.length} />
  ) : (
    <>
    <h2>Your Bookmark <span className="flex-centre bg-emerald-500 px-2 py-1 rounded-lg ml-2">{bookmarks.length}</span></h2>
    <Divider className="border-gray-600"/>
    {
    bookmarks.map(({ id,  host_location, cityName, latitude , longitude , countryCode , currentBookmark}) => {
        return (
        <React.Fragment key={id}>
         <Link to={`${id}?lat=${latitude}?lng=${longitude}`}
    className="border-gray-700 flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w-xl  bg-gray-800 hover:bg-gray-700"
    >
    <div className="flex flex-col justify-between p-4 leading-normal">
      <h5 className="flex-center gap-2 mb-2 text-xl font-bold tracking-tight text-white">
        <ReactCountryFlag svg countryCode={countryCode}/>
        {host_location}
      </h5>
      <p className="mb-3 font-normal text-gray-400">{cityName}</p>
    </div>
  </Link>
        </React.Fragment>
      );
    })
    }
    </>
  );
}

export default Bookmark