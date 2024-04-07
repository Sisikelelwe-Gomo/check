'use client'
import React, { useState } from 'react';
import SearchSection from '../components/Home/SearchSection'
import GoogleMapSearchSection from '../components/Home/GoogleMapSection'
import CarListOptions from '../components/Home/CarListOptions'
import { SourceContext } from '../context/SourceContext'
import { DestinationContext } from '../context/DestinationContext'
import { LoadScript } from '@react-google-maps/api';

export default function Home() {
  const [source, setSource] = useState(null)
  const [destination, setDestination] = useState(null)
  const [showCarList, setShowCarList] = useState(false);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          libraries={['places']}
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
<div>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pt-12 pl-12 pr-12 pb-10">
    <div style={{ maxWidth: '350px', maxHeight: '370px' }}>
      <SearchSection  setShowCarList={setShowCarList}/>
    </div>
    <div className="md:col-span-3 rounded-lg flex">
    <div style={{ flex: '2' }}>
    <CarListOptions />
  </div>
  <div style={{ flex: '1' }}>
    <GoogleMapSearchSection />
  </div>
</div>

  </div>
</div>



        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}