import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch';
import { SingleHotelCard } from '../Hotels/Hotels';
import LocationSearchListLoading from '../../Components/Loading/LocationSearchListLoading'
import { useHotels } from '../Context/HotelsProvider';

const SingleHotel = () => {
const {id} = useParams()
const {currentHotel , getHotel , isLoadingCurrentHotel} = useHotels()
useEffect(() => {
 getHotel(id)
}, [id])
const {hotelID, medium_url, smart_location, name, latitude , longitude , price} = currentHotel
  return (
    isLoadingCurrentHotel ? (
        <LocationSearchListLoading listsToRender={1} />
      ) : (
        <>
              <SingleHotelCard id={hotelID} currentHotel={currentHotel} medium_url={medium_url} smart_location={smart_location} name={name} latitude={latitude} longitude={longitude} price={price}/>
        </>
      )
  )
}

export default SingleHotel