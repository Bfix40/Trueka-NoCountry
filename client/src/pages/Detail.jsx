/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import MapView from '../components/MapView/MapView'
import './Detalle.css'
import Button from 'react-bootstrap/esm/Button'
import Carousel from '../components/carousel/Carousel'
import LocationName from '../components/LocationName/LocationName'

// import Estrellas from './Perfil/Estrellas'
// import PerfilUser from './Perfil/PerfilUser'
import Ofertar from './Ofertar'
/* Redux toolkit imports */
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../features/authSlice/authSlice'
import { getProductById } from '../features/productsSlice/productSlice'
import { setLocation } from '../features/location/location'
/* custom Hook Local Storage */

export default function Detail () {
  const product = useSelector((state) => state?.productsDb?.productById)
  const userInfo = useSelector((state) => state.authUser?.userById)
  const geoLocation = JSON.parse(localStorage.getItem('geo'))
  const lat = parseFloat(geoLocation.lat)
  const lon = parseFloat(geoLocation.lon)
  const dispatch = useDispatch()
  const { id, owner } = useParams()

  useEffect(() => {
    if (product !== false) {
      dispatch({ type: 'products/clearProductById' })
    }

    if (owner !== '64aba27c2415d442b78559c1') {
      dispatch(getUserById(owner))
    }

    dispatch(getProductById(id))
  }, [])

  useEffect(() => {
    if (owner !== '64aba27c2415d442b78559c1' && product !== false) {
      dispatch(getUserById(owner))
    }
  }, [product, dispatch])

  return (
    <>
      {product.owner !== undefined
        ? (<>
          <div>
            <h3 className='titulo-detalle'>{product?.name}</h3>
            <div className='imagen-descripcion'>
              <div className='contenedor-imagen'>
                <img src={product?.images} alt='' className='imagen-producto' />

              </div>

              <div className='usuario-descripcion'>

                <h4 className='nombre-usuario'> {userInfo?.firstName} {userInfo?.lastName} </h4>

                <div className='estrellas'>
                  {/* <Estrellas /> */}
                </div>

                <hr />

                <p className='descripcion'>{product?.description}</p>
              </div>

            </div>

            <hr />

            <h4 className='ubicacion'>Ubicacion</h4>

            <div className='controlar-mapa'>
              <div className='mapa'><MapView longitude={lon} latitude={lat} /></div>

            </div>
            <LocationName />
            <div className='boton'>
              <Link to={`/ofertar/${product?._id}`}><button className='ofertar' product={product}>Ofertar</button></Link>

            </div>
            <h6 className='ubicacion'>Otras publicaciones de este usuario.</h6>

            <div className='control-carrusel'>
              <div className='carrusel'>
                {/* <Carousel data={userInfo?.products} /> */}

              </div>

            </div>

          </div>
           </>
          ) : <Loading />}
    </>
  )
};

/* return (
  <>
    <Card style={{
      width: '350px',
      aspectRatio: '1/1',
      margin: 'auto',
      marginTop: '5rem',
      border: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: '1rem' }}>
        {
          loading
            ? <Loading />
            : (
              <>
                <div>
                  <img src={product.image} alt='' />

                </div>

                <Typography variant='h5' component='div'>
                  Titulo: {product.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {product.description}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Categoría: {product.category}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Estado: {product.price}
                </Typography>
              </>
            )
        }

      </CardContent>
    </Card>
    <MapView />
  </>
) */

/* <p>Categoría: {product.category}.</p>
<p>Estado: {product.price}</p> */
