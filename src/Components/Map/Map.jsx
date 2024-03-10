import React from 'react'
import { useHotels } from '../Context/HotelsProvider'

const Map = () => {
const {isLoading , hotels} = useHotels()
  return (
    <section className='overflow-y-scroll h-full'>Map</section>
  )
}

export default Map