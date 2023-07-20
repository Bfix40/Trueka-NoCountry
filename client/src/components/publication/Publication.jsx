import './styles/publication.css'
import 'swiper/css'
import Input from './Input'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getCategoriesById } from '../../features/categoriesSlice/categorySlice'
import { createProduct } from '../../features/productsSlice/productSlice'
import PBCarousel from './PBCarousel'
import { obtenerCoordenadas } from '../../features/pruebaBarrioSlice/pruebaBarrioSlice'

function Publication () {
  const [formState, setformState] = useState({
    owner: '64aba27c2415d442b78559c1',
    name: '',
    category: '',
    subcategory: '',
    images: [],
    location: '',
    description: '',
    lon: '-58.44924',
    lat: '-34.57365'
  })
  const [files, setFiles] = useState([])
  const categories = useSelector((state) => state?.categories?.categories)
  const subCategory = useSelector((state) => state?.categories?.category)
  const barrio = useSelector((state) => state?.barrio?.cordenadas)

  const dispatch = useDispatch()

  const height = files.length > 0 ? '142px' : '0'
  const opacity = files.length > 0 ? '1' : '0'

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setformState((prevformState) => ({
      ...prevformState,
      [name]: value
    }))
  }

  const hanldeFileChange = (e) => {
    const file = e.target.files
    setFiles([...files, ...file])
    const filesArray = Array.from(file)
    setformState((prevformState) => ({
      ...prevformState,
      images: [...prevformState.images, ...filesArray]
    }))
  }

  const resetValues = () => {
    setformState({
      owner: '64aba27c2415d442b78559c1',
      name: '',
      category: '',
      subcategory: '',
      images: [],
      location: '',
      description: '',
      lon: '-58.44924',
      lat: '-34.57365'
    })

    setFiles([])
  }

  const submitForm = (form) => {
    dispatch(createProduct(form))
      .then((res) => {
        console.log('res ->', res)
      })
      .catch((err) => {
        console.log('err ->', err)
      })
      .finally(() => {
        console.log('--- finalizo ---')
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('owner', formState.owner)
    formData.append('name', formState.name)
    formData.append('category', formState.category)
    formData.append('subcategory', formState.subcategory)
    files.forEach((image) => formData.append('images', image))
    formData.append('location', formState.location)
    formData.append('description', formState.description)
    formData.append('lon', barrio.longitude)
    formData.append('lat', barrio.latitude)

    let logged = false
    formData.forEach((value, key) => {
      // console.log('FORM DATA -->', key, value)
      const allFields = { ...formState, images: [...formState.images] }
      if (!logged) {
        console.log(allFields)
        logged = true
      }
    })

    formState.name !== '' && formState.category !== '' && formState.subcategories !== '' && formState.images.length > 0 && formState.images.length <= 10 && formState.description !== '' ? submitForm(formData) : console.log('Inputs vacios o excede las 10 imagenes')

    setTimeout(() => {
      resetValues()
      formData = new FormData()
    }, 200)
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    const categoryId = categories.length > 0 && formState.category !== '' ? categories.find((category) => category._id === formState.category)._id : ''
    setTimeout(() => {
      dispatch(getCategoriesById(categoryId))
    }, 10)
  }, [formState.category])

  useEffect(() => {
    if (formState.location !== '') {
      dispatch(obtenerCoordenadas(formState.location))
    }
  }, [dispatch, formState.location])

  return (
    <>
      <form className='publication-container' onSubmit={handleSubmit}>
        <div className='title-container'>
          <p>Publicar un artículo</p>
        </div>

        <div className='custom-container'>
          <Input ids='input-bot' placeh='Ej: Bicicleta BMX, rodado 24' type='text' name='name' onInputChange={handleInputChange}>Indicá producto, marca, modelo y características principales</Input>
        </div>

        <div className='custom-container'>
          <Input type='select' name='category' onInputChange={handleInputChange} categories={categories} opcion='categoría'>Seleccioná la categoría que corresponde a tu artículo</Input>
        </div>

        <div className='custom-container'>
          <Input type='select' name='subcategory' onInputChange={handleInputChange} categories={subCategory.subcategories} opcion='subcategoría'>Seleccioná la subcategoría que corresponde a tu artículo</Input>
        </div>

        {/* Funcion de agregar fotos a la publicacion */}

        <div className='custom-container'>
          <div className='title-carousel'>
            <div>
              <p className='input-title'>Cargá las fotos reales de  tu artículo (Hasta 10 fotos)</p>
            </div>

            <div className='carousel-div' style={{ height, opacity }}>
              <PBCarousel data={files} />

            </div>

            <div className='input-container'>
              <label htmlFor='add-image-input' className='label-input'>
                +Cargar fotos
              </label>

              <input
                type='file'
                id='add-image-input'
                multiple
                name='images'
                onChange={hanldeFileChange}
              />
            </div>
          </div>

        </div>

        <div className='custom-container'>
          <Input ids='input-bot' placeh='Ej:Pais, Ciudad, Localidad' type='text' name='location' onInputChange={handleInputChange}>
            Indicá dónde se encuentra el artículo que querés publicar
          </Input>
        </div>

        <div className='custom-container'>
          <Input
            ids='input-desc' type='text' name='description' placeh='Describí el artículo que estás publicando para intercambiar. Detallá las condiciones en las que se encuentra y si hay cosas que tu contraparte debe saber. Indicá si estás buscando artículos específicos por los que te gustaría intercambiar éste.' onInputChange={handleInputChange}
          >
            Descripción del artículo
          </Input>
        </div>

        <div>
          <button type='submit' className='submit-button-p'>
            Publicar
          </button>
        </div>

      </form>

    </>
  )
}

export default Publication
