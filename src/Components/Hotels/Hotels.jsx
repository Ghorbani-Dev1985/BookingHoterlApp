import React from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'

const Hotels = () => {
 const [searchParams , setSearchParams] = useSearchParams()
 const destination = searchParams.get("destination")
 const room = JSON.parse(searchParams.get("options"))?.room
 const { data, isLoading } = useFetch("hotels", `q=${destination || ""}&accommodates_gte=${room || 1}`);
 // name_like , host_location_like
 console.log(destination)
  return (
    <div>{data.length}</div>
  )
}

export default Hotels