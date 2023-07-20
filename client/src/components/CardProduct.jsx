import { Link } from 'react-router-dom'
import '../components/CardProduct.css'
import LocationSVG from './LocationSVG'
import LocationSVGMobile from './LocationSVGMobile'

export default function card (products) {
  const handleInfo = (value) => {
    localStorage.setItem('geo', JSON.stringify(value))
  }

  return (
    <>
      {products.props.map((product, i) => (
        <Link to={`/detalle/${product._id}/${product.owner}`} className='card-link' key={i} onClick={() => handleInfo(product.geolocation)}>

          <div className='container-card'>
            <div className='img-container '>
              <img src={product.images} className='card-img-top' alt='product-image' />
            </div>
            <div className='card-grid'>
              <p className='text-card'>{product.name}</p>
              <div className='location-container'>
                <div id='desktop-svg'>
                  <LocationSVG />
                </div>
                <div id='mobile-svg'>
                  <LocationSVGMobile />
                </div>

                <p className='ubi-text'>{product.location}</p>
              </div>

            </div>
          </div>
        </Link>
      ))}

    </>
  )
}
