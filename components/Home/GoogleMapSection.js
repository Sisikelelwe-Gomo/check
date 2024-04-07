// GoogleMapSection.js
import React, { useState, useEffect, useContext } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: '100vh',
  };

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);

  useEffect(() => {
    if (source && destination) {
      directionRoute();
    }
  }, [source, destination]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoints(result);
        if (map) {
          const bounds = new window.google.maps.LatLngBounds();
          result.routes[0].legs.forEach(leg => {
            bounds.extend(leg.start_location);
            bounds.extend(leg.end_location);
          });
          map.fitBounds(bounds);
        }
      } else {
        console.error('Error');
      }
    });
  };

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  
  return (
    <div className='flex'>
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={source ? { lat: source.lat, lng: source.lng } : { lat: -26.20227, lng: 28.04363 }}
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
            <OverlayView position={{ lat: source.lat, lng: source.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
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
            <OverlayView position={{ lat: destination.lat, lng: destination.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div className='p-2 bg-white font-bold inline-block'>
                <p className='text-black text-[16px]'> {destination.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
        )}

        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: '#000',
              strokeWeight: 5
            },
            suppressMarkers: true
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapSection;
