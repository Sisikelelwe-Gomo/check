import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '205%', // Set width to 100% of the viewport width
    height: '205%', // Set height to 100% of the viewport height
  };
  
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: 37.7749295,
    lng: -122.4194155
  });

  const [map, setMap] = useState(null);

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
  }, [source, map]);

  useEffect(() => {
    if (destination && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      });
    }
  }, [destination, map]);

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
      center={center}
      zoom={10}
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
        />
      )}

{destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: 'dest.jpg',
            scaledSize: { width: 20, height: 20 }
          }}
        />
      )}

    </GoogleMap>
  );
}

export default GoogleMapSection;
