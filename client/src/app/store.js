import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice/authSlice'
import categoriesReducer from '../features/categoriesSlice/categorySlice'
import productReducer from '../features/productsSlice/productSlice'
import locationReducer from '../features/location/location'
import subcategoriesReducer from '../features/subCategoriesSlice/subcategoriesSlice'
import barrioReducer from '../features/pruebaBarrioSlice/pruebaBarrioSlice'

export const store = configureStore({
  reducer: {
    authUser: authReducer,
    productsDb: productReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    barrio: barrioReducer,
    location: locationReducer
  }
})
