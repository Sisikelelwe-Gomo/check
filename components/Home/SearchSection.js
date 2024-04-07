import React, { useContext, useEffect, useState } from 'react';
import InputItem from './InputItem';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
import CarListOptions from './CarListOptions';

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [distance, setDistance] = useState(null);

  const calculateDistance = () => {
    if (source && destination) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        { lat: source.lat, lng: source.lng },
        { lat: destination.lat, lng: destination.lng }
      );

      setDistance(dist * 0.00621374 * 1.60934);
    }
  };

  useEffect(() => {
    console.log("Source:", source);
    console.log("Destination:", destination);
  }, [source, destination]);

  return (
    <div>
      <div className='p-1 md:p-6 border-[2px] rounded-3xl w-full md:w-80 h-auto md:h-40hv '>
        <p className='text-[20px] font-bold'>Get a ride</p>
        <InputItem type='source' />
        <InputItem type='destination'/>
        <button className='p-2 bg-gray-100 text-black w-full mt-5 rounded-lg text-left'>Pickup now</button>
        <button className='p-2 bg-gray-100 text-black w-32 mt-5 rounded-3xl'>For me</button>
        <button className='p-2 bg-black w-full mt-5 text-white rounded-lg' onClick={calculateDistance}>Search</button>
      </div>
      {distance !== null ? <CarListOptions distance={distance} /> : null}
    </div>
  );
}

export default SearchSection;
