import React from 'react'

// recibe un numero, el "raiting del usuario" y retorna las estrellas que corresponden de acuerdo a ese raiting
const Stars = ({ number }) => {
  const total = 5
  const ratingReal = (number / 2)
  const starIconLleno = 'star-sharp'
  const starIconMedioLleno = 'star-half-sharp'
  const starIconVacio = 'star-outline'

  const array = []

  if (ratingReal % 2 === 0) {
    for (let index = 0; index < total; index++) {
      if (index < ratingReal) {
        array.push(starIconLleno)
      } else {
        array.push(starIconVacio)
      }
    }
  } else {
    for (let index = 0; index < total; index++) {
      if (index < Math.floor(ratingReal)) {
        array.push(starIconLleno)
      } else if (index === Math.floor(ratingReal)) {
        array.push(starIconMedioLleno)
      } else {
        array.push(starIconVacio)
      }
    }
  }

  return (
    <>
      <div className='d-flex flex-row justify-content-start align-items-center align-content-center flex-nowrap gap-2 ' style={{ fontSize: '25.426px', height: '50px' }}>
        {
          array.map((element, i) => {
            return (<ion-icon key={i} name={element} style={{ color: 'var(--background-nav)' }} />)
          })
          }
      </div>
    </>
  )
}

export default Stars
