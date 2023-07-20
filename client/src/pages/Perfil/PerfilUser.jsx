import React, { useEffect, useRef, useState } from 'react'
import { calcularReputacion } from './calculaReputacion'
import { useDispatch, useSelector } from 'react-redux'
import { getBarrio } from '../../features/pruebaBarrioSlice/pruebaBarrioSlice'
import Stars from './Stars/Stars'
import { Link } from 'react-router-dom'
import CarruselProductsCard from './CarruselProductsCard/CarruselProductsCard'
// import RenderCarrusel from './RenderCarrusel'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CardMiniPerfil from './CardMiniPerfil/CardMiniPerfil'
import UserBannerStatistics from './UserBannerStatistics/UserBannerStatistics'
import ReusableCarrusel from './ReusableCarrusel/ReusableCarrusel'

const PerfilUser = () => {
  const ubication = useSelector(state => state?.location)
  const barrio = useSelector(state => state?.barrio?.barrio)
  const productsYouLike = useSelector((state) => state?.productsDb?.likeProducts)
  const [calculaRep, setCalculaRep] = useState('')
  const dispatch = useDispatch()
  const lastUbication = useRef(null)
  // console.log('Ubicacion Anterior -->', lastUbication)
  // console.log('Ubicacion Anterior -->', lastUbication)

  const reputacionUSer = { intercambiosExitosos: 15, intercambiosFallidos: 2, totalPublicaciones: 32, valoracionesPositivas: 15, valoracionesNegativas: 2, devoluciones: 1 }

  const objeto = {
    _id: '64aba27c2415d442b78559c1',
    img: 'https://res.cloudinary.com/dpiwmbsog/image/upload/v1686264426/PERFIL_GENERAL_hbngdm.jpg',
    email: 'guillermoneculqueo@gmail.com',
    password: '@Guille123',
    firstName: 'guillermo agustin',
    lastName: 'neculqueo',
    contact: '2944396887',
    address: 'argentina, rio negro, ingeniero jcobacci'
  }
  const productsDestacados = []

  useEffect(() => {
    setCalculaRep(calcularReputacion(reputacionUSer))
  }, [])

  useEffect(() => {
    if (ubication && ubication !== lastUbication.current) {
      lastUbication.current = ubication
      dispatch(getBarrio(ubication))
    }
  }, [ubication, dispatch])

  return (
    <div className='container principalPerfil p-2 d-flex flex-column justify-content-center align-items-center overflow-hidden mt-3 gap-5' style={{ minWidth: '350px', height: 'auto' }}>

      <div className='card d-flex flex-column justify-content-center align-items-center align-content-center flex-nowrap gap-3' style={{ minWidth: '350px', width: '450px', maxWidth: '600px', height: 'auto', border: 'none' }}>

        {/* head perfil */}
        <CardMiniPerfil usuario={objeto} barrio={barrio} />

        {/* Estrellas valoracion */}
        <Stars number={calculaRep} />

        {/* Calificacion Usuario  */}
        <UserBannerStatistics reputacion={reputacionUSer} />

        {/* info perfil */}
        <section>
          <Link to='/perfil/crudUSer' className='fw-semibold pb-0 border-bottom border-danger' style={{ fontSize: '15.256px', color: 'var(--background-nav)', textDecoration: 'none', paddingBottom: '5px' }}>
            Ver mas datos de este usuario
          </Link>
        </section>
      </div>

      {/* RenderCarrusel con productos del usuario */}
      <CarruselProductsCard filtroPor={objeto._id} titulo={objeto.firstName} user={objeto} />

      {/* RenderCarrusel con productos que le gustan al usuario */}
      <ReusableCarrusel titulo='Productos que sigues' productos={productsYouLike} />

      {/* RenderCarrusel con productos destacados */}
      <ReusableCarrusel titulo='Publicaciones destacadas' productos={productsDestacados} />

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ToastContainer />
    </div>
  )
}

export default PerfilUser
