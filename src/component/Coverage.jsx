import React, { use, useRef } from 'react';
import  "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
const servicePromise = fetch('../service.json').then(res=>res.json())

const Coverage = () => {
  const centers = use(servicePromise)
  console.log(centers);
    const  position = [23.6850,90.356]
    const mapRef = useRef()

    const handleLocation = e=>{
      e.preventDefault()
      const location = e.target.location.value;
      console.log(location);
      const district = centers.find(center=>center.district.toLowerCase().includes(location.toLowerCase()))
      if(district){
        const coord= [district.latitude,district.longitude]
        console.log(coord);
        mapRef.current.flyTo(coord,14)
      }

    }
    return (
      <div className='my-5'>
        <h3 className='font-bold text-2xl text-primary underline text-center my-3'>Our Service Centers</h3>
        <div className='text-center my-6'>
          {/* search */}
           
        <form onSubmit={handleLocation}>
          <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="7"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" name="location" required placeholder="Search" />
</label>
        </form>
           
        </div>
          <div className=' max-w-7xl mx-auto border h-[800px]'>
            <MapContainer
            ref={mapRef} 
             center={position} zoom={14} scrollWheelZoom={false} className='h-[800px]'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {
    centers.map(center=> <Marker position={[center.latitude,center.longitude]}>
      <Popup>
        {center.district}. <br /> Service Area:{center.covered_area.join(', ')}
      </Popup>
    </Marker>)
   }
  </MapContainer>
        </div>
      </div>
    );
};

export default Coverage;