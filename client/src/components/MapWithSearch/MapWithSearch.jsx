import React, { useState } from 'react'
import axios from 'axios'

const MapWithSearch = () => {
  const [location, setLocation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: searchTerm,
            key: 'AIzaSyB4ehacPzGTBQ4iCrRK0APPkq8u7oMD4L8'
          }
        }
      )

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location
        setLocation({ lat, lng })
      } else {
        setLocation(null)
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error)
    }
  }

  return (
    <div>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Ingresa una ubicación...'
      />
      <button onClick={handleSearch}>Buscar</button>
      {location && (
        <div>
          <p>Latitud: {location.lat}</p>
          <p>Longitud: {location.lng}</p>
        </div>
      )}
    </div>
  )
}

export default MapWithSearch
