import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchProductById, getProducts } from '../features/products/fetchProducts'
import OfertarCards from './OfertarCards'
import './Ofertar.css'

const Ofertar = () => {
  const product = useSelector((state) => state?.products?.productById)
  const loading = useSelector((state) => state?.products?.loading)
  const globalProduct = useSelector((state) => state?.products?.products)
  const dispatch = useDispatch()

  const { id } = useParams()

  console.log('recibo en ofertar')

  console.log(id)

  useEffect(() => {
    // dispatch(fetchProductById(id))
  }, [dispatch])

  console.log(globalProduct)

  return (
    <div>
      <h3 className='titulo-detalle'>{product.title}</h3>
      <div className='imagen-descripcion'>
        <div className='contenedor-imagen'>
          <img src={product.image} alt='' className='imagen-producto' />
        </div>
      </div>

      <hr />

      <div className='articulo-ofrecer'>
        <h3>¿Qué artículo/s querés ofrecer por este?</h3>
      </div>

      <div className='ver-todos'>
        <Link><h6>Ver todos.</h6></Link>
      </div>

      <div className='acomodar'>
        {globalProduct.map(prod => <div key={prod.id}><OfertarCards prod={prod} /></div>)}
      </div>
      <div className='boton'>
        <button className='ofertar' product={product}>Confirmar Oferta</button>

      </div>
      <div className='publica'>
        <Link to='/publicacion'><p>+ Publicar otro articulo.</p></Link>

      </div>

    </div>
  )
}

export default Ofertar
