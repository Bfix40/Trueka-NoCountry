import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import CardProduct from '../components/CardProduct'
import Loading from '../components/Loading'
import { getProducts } from '../features/productsSlice/productSlice'
import '../pages/styles/Home.css'
import Carousel from '../components/carousel/Carousel'
import { Link } from 'react-router-dom'
import MapWithSearch from '../components/MapWithSearch/MapWithSearch'

function Home () {
  const products = useSelector((state) => state?.productsDb?.products)
  const error = useSelector((state) => state?.productsDb?.error)
  const loading = useSelector((state) => state?.productsDb?.loading)
  const results = useSelector((state) => state?.productsDb?.searchResults)
  const latest = [...products].reverse().slice(0, 12)
  const location = useSelector((state) => state?.location)
  const dispatch = useDispatch()
  const [nearbyProducts, setNearbyProducts] = useState([])
  const [distanceFilter, setDistanceFilter] = useState(10)

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  const gridTemplateColumns = results.length < 6 ? 'repeat(auto-fit, minmax(170px, 200px))' : 'repeat(auto-fit, minmax(190px, 0.4fr))'

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    // console.log(products)
    // console.log(error)
  }, [products])

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const nearbyProducts = products.filter((product) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          product.latitude,
          product.longitude
        )
        return distance <= distanceFilter // cambiar luego con filtro por distancia
      })
      setNearbyProducts(nearbyProducts)
    }
  }, [location, products])

  return (
    <>
      {loading
        ? (
          <div className='loading-container'>
            <Loading />
          </div>

          )
        : (
            !results
              ? (
                <div className='controlar-home-container'>
                  <div className='home-container'>
                    <div className='carousel-rows-container'>
                      <div className='p-carousel-container'>
                        <MapWithSearch />

                        <div className='title-and-more-container'>
                          <p className='carousel-title'>Últimas publicaciones</p>
                          <Link>
                            <p className='view-more-p'>Ver mas</p>
                          </Link>
                        </div>

                        <Carousel data={latest} />
                      </div>

                      <div className='p-carousel-container'>

                        <div className='title-and-more-container'>
                          <p className='carousel-title'>Publicaciones populares</p>
                          <Link>
                            <p className='view-more-p'>Ver mas</p>
                          </Link>
                        </div>

                        <Carousel data={products} />
                      </div>

                      <div className='p-carousel-container'>

                        <div className='title-and-more-container'>
                          <p className='carousel-title'>Publicaciones que seguís</p>
                          <Link>
                            <p className='view-more-p'>Ver mas</p>
                          </Link>
                        </div>

                        <Carousel data={products} />
                      </div>

                    </div>
                  </div>
                </div>)
              : (results !== 'none'
                  ? (
                    <>
                      <div className='home-container'>
                        <div className='products-container' style={{ gridTemplateColumns }}>
                          <CardProduct className='products-list' props={results} />
                        </div>
                      </div>

                    </>)
                  : <div className='home-container carousel-title'>No se encontraron resultados </div>
                )
          )}
    </>
  )
}

export default Home
