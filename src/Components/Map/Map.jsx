import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useGeoLocation from '../../Hooks/useGeoLocation'
import { CircularProgress } from '@mui/material'
import useUrlLocation from '../../Hooks/useUrlLocation'

const Map = ({markerLocation}) => {
const [mapCenter , setMapCenter] = useState([51 , 10])
const [lat , lng] = useUrlLocation()
const {isLoading: isLoadingPosition , position: geoLocationPosition , getPosition} = useGeoLocation()
 useEffect(() => {
    if(lat && lng) setMapCenter([lat , lng])
 },[lat , lng])
useEffect(()=>{
    if(geoLocationPosition?.lat && geoLocationPosition?.lng) setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng])
},[geoLocationPosition])
  return (
    <section className='overflow-y-scroll h-full min-h-screen relative z-10'>
         <MapContainer className='h-full relative z-10' center={mapCenter} zoom={6} scrollWheelZoom={true}>
    <button onClick={getPosition} className='bg-orange-400 min-w-36 h-10 font-bold absolute top-3 left-12 z-[1000] px-2 py-1 rounded-lg'>
        {isLoadingPosition ? <CircularProgress className='text-white !size-6'/> : "Use Your Location"}
    </button>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    <DetectClick />
    <ChangeCenter position={[lat || 50 , lng || 3]}/>
   {
    markerLocation.map(({id , latitude , longitude , host_location})=> {
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

function ChangeCenter({position}){
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick(){
    const navigate = useNavigate()
    useMapEvent({
        click: e => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null
}