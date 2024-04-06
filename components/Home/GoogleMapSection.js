import React, { useState, useEffect, useContext } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '205%', 
    height: '100vh', 
  };
  
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: 37.7749295,
    lng: -122.4194155
  });

  const [map, setMap] = useState(null);

  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  useEffect(() => {
    if (source && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng
      });
      setCenter({
        lat: source.lat,
        lng: source.lng
      });
    }
    if(source && destination)
    {
  directionRoute();
    }
  }, [source, map]);

  useEffect(() => {
    if (destination && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      });
    }

    if(source&&destination)
    {
  directionRoute();
    }
  }, [destination, map]);


  const directionRoute = () => {

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin:{lat: source.lat, lng: source.lng},
    destination:{lat: destination.lat, lng: destination.lng},
    travelMode:google.maps.TravelMode.DRIVING}, (result, status) => {

      if (status === google.maps.DirectionsStatus.OK){

        setDirectionRoutePoints(result)

      }else{
        console.error('Error');
      }

    })
    

  }



  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={source ? { lat: source.lat, lng: source.lng } : { lat:-26.20227 , lng: 28.04363 }}
      zoom={8}

      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: 'c0f82c33615b1955' }}
    >
      {source && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: 'source.png',
            scaledSize: { width: 20, height: 20 }
          }}
          >

          <OverlayView position={{lat: source.lat, lng: source.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>


          <div className='p-2 bg-white font-bold inline-block'>
          <p className='text-black text-[16px]'> {source.label}</p>
          </div>
          </OverlayView>

        </MarkerF>

      )}

{destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: 'dest.jpg',
            scaledSize: { width: 20, height: 20 }
          }}
        >
          <OverlayView position={{lat: destination.lat, lng: destination.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>


          <div className='p-2 bg-white font-bold inline-block'>
          <p className='text-black text-[16px]'> {destination.label}</p>
          </div>
          </OverlayView>
          </MarkerF>
      )}


<DirectionsRenderer

directions={directionRoutePoints}
options = {{
  polylineOptions: {
    strokeColor: '000',
    strokeWeight: 5
  },
  suppressMarkers:true

}}
/>
    </GoogleMap>
  );
}

export default GoogleMapSection;
