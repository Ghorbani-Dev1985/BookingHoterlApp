import React, { useState } from 'react'
import { useHotels } from '../Context/HotelsProvider'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Map = () => {
const {isLoading , hotels} = useHotels()
const [mapCenter , setMapCenter] = useState([51 , 3])
  return (
    <section className='overflow-y-scroll h-full min-h-screen'>
         <MapContainer className='h-full' center={mapCenter} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
   {
    hotels.map(({id , latitude , longitude , host_location})=> {
        return(
            <React.Fragment key={id}>
                 <Marker position={[latitude , longitude]}>
      <Popup>
       {host_location}
      </Popup>
    </Marker>
            </React.Fragment>
        )
    })
   }
  </MapContainer>
    </section>
  )
}

export default Map