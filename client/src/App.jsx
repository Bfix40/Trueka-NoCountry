import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLocation } from './/features/location/location'
import AppRouter from './routes/AppRouter'
import './index.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('SE EJECUTA FUNC APP')
    navigator.geolocation.getCurrentPosition(
      function (position) {
        dispatch(
          setLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
        )
      },
      function (error) {
        // console.log(error)
      },
      {
        enableHighAccuracy: true
      }
    )
  }, [dispatch])

  return (
    <div className='probando'>

      <AppRouter />
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

export default App
