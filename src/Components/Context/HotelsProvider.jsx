import React, { createContext } from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

const HotelContext = createContext()

const HotelsProvider = ({children}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const { data: hotels, isLoading } = useFetch(
      "hotels",
      `q=${destination || ""}&accommodates_gte=${room || 1}`
    );
    // name_like , host_location_like
  return (
    <HotelContext.Provider value={{hotels , isLoading}}>
        {children}
    </HotelContext.Provider>
  )
}

export default HotelsProvider

export const useHotels = () => {
   return useContext(HotelContext)
}