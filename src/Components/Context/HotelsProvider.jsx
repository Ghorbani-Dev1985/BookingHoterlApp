import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import ApiRequest from '../../Services/Axios/Config';

const HotelContext = createContext()

const HotelsProvider = ({children}) => {
    const [currentHotel, setCurrentHotel] = useState("")
    const [isLoadingCurrentHotel , setIsLoadingCurrentHotel] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const { data: hotels, isLoading } = useFetch(
      "hotels",
      `q=${destination || ""}&accommodates_gte=${room || 1}`
    );
    // name_like , host_location_like
    async function getHotel(id) {
        setIsLoadingCurrentHotel(true)
        const getHotelData = await ApiRequest(`hotels/${id}`)
        .then(response => {
            setCurrentHotel(response.data)
            setIsLoadingCurrentHotel(false)
        })
        .catch((error) =>{
            if(error){
             setCurrentHotel("")
             setIsLoadingCurrentHotel(false)
            }
           })
    }
  return (
    <HotelContext.Provider value={{hotels , isLoading , currentHotel , getHotel, isLoadingCurrentHotel}}>
        {children}
    </HotelContext.Provider>
  )
}

export default HotelsProvider

export const useHotels = () => {
   return useContext(HotelContext)
}