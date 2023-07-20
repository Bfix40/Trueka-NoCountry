import React from 'react'
import { useSelector } from 'react-redux'
import { GoogleMap, Marker, Circle, InfoWindow } from '@react-google-maps/api'

function MapView ({ longitude, latitude }) {
  // const location = useSelector(state => state.location)

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  }

  const center = {
    lat: latitude,
    lng: longitude
  }

  const [showInfoWindow, setShowInfoWindow] = React.useState(false)

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
    >
      <Marker
        position={center}
        onClick={() => setShowInfoWindow(true)}
      />

      <Circle
        center={center}
        radius={1000}
        options={{
          fillColor: 'blue',
          fillOpacity: 0.2,
          strokeColor: 'blue',
          strokeOpacity: 0.8,
          strokeWeight: 2
        }}
      />
      {showInfoWindow && (
        <InfoWindow
          position={center}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <div>
            <p>Tu ubicación actual</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

export default MapView
