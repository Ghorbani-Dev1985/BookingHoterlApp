import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch';
import { SingleHotelCard } from '../Hotels/Hotels';
import LocationSearchListLoading from '../../Components/Loading/LocationSearchListLoading'

const SingleHotel = () => {
const {id} = useParams()
const { data, isLoading } = useFetch(`hotels/${id}`, '');
const {hotelID, medium_url, smart_location, name, latitude , longitude , price} = data
  return (
    isLoading ? (
        <LocationSearchListLoading listsToRender={1} />
      ) : (
        <>
              <SingleHotelCard id={hotelID} medium_url={medium_url} smart_location={smart_location} name={name} latitude={latitude} longitude={longitude} price={price}/>
        </>
      )
  )
}

export default SingleHotel