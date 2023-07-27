import { useSelector } from 'react-redux'
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
  const user = useSelector(state => state?.autenticacion?.user)
  const productsYouLike = useSelector((state) => state?.productsDb?.likeProducts)

  const productsDestacados = []

  return (
    <div className='container principalPerfil p-2 d-flex flex-column justify-content-center align-items-center overflow-hidden mt-3 gap-5'>

      <div className='card d-flex flex-column justify-content-center align-items-center align-content-center flex-nowrap gap-3' style={{ border: 'none' }}>

        {/* head perfil */}
        <CardMiniPerfil />

        {/* Estrellas valoracion */}
        <Stars />

        {/* Calificacion Usuario  */}
        <UserBannerStatistics />

        {/* info perfil */}
        <section>
          <Link to='/perfil/calificacionesRecibidas' className='fw-semibold pb-0 border-bottom border-danger' style={{ fontSize: '15.256px', color: 'var(--background-nav)', textDecoration: 'none', paddingBottom: '5px' }}>
            Ver mas datos de este usuario
          </Link>
        </section>
      </div>

      {/* RenderCarrusel con productos del usuario */}
      <CarruselProductsCard filtroPor={user._id} titulo={user.firstName} user={user} />

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
