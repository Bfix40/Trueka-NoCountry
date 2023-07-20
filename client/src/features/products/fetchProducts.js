// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// // dejo armado el slice, asi ya despues solo cambiamos la ruta

// const API_URL = 'https://fakestoreapi.com'

// export const getProducts = createAsyncThunk(
//   '/products/getProducts',
//   async () => {
//     try {
//       const response = await fetch(`${API_URL}/products`, {
//         method: 'GET',
//         headers: {
//           'Content-type': 'application/json'
//         }
//       })
//       if (!response.ok) {
//         const error = await response.json()
//         throw new Error(error.message)
//         // throw new Error('Algo salio mal')
//       }
//       const data = await response.json()
//       return data
//     } catch (error) {
//       return error.message
//     }
//   }
// )

// // trae todos los productos
// export const fetchCategories = createAsyncThunk(
//   'products/fetchProductsCategories',
//   async (_, thunkAPI) => {
//     try {
//       const response = await fetch(`${API_URL}/products/categories`, {
//         method: 'GET',
//         headers: {
//           'Content-type': 'application/json'
//         }
//       })
//       if (!response.ok) {
//         const error = await response.text()
//         return thunkAPI.rejectWithValue(error)
//         // throw new Error('Algo salio mal')
//       }
//       const data = await response.json()
//       return data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   }
// )

// // filtro por categorias
// export const fetchProductsByCategory = createAsyncThunk(
//   'products/fetchProductsByCategory',
//   async (categoryName, thunkAPI) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/products/category/${categoryName}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-type': 'application/json'
//           }
//         }
//       )
//       if (!response.ok) {
//         const error = await response.text()
//         return thunkAPI.rejectWithValue(error)
//         // throw new Error('Algo salio mal')
//       }
//       const data = await response.json()
//       return data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// )

// // filtro por id
// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (id, thunkAPI) => {
//     try {
//       const response = await fetch(`${API_URL}/products/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-type': 'application/json'
//         }
//       })
//       if (!response.ok) {
//         const error = await response.text()
//         return thunkAPI.rejectWithValue(error)
//         // throw new Error('Algo salio mal')
//       }
//       const data = await response.json()
//       return data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// )

// // filtro por palabra clave
// export const fetchProductByKeyword = createAsyncThunk(
//   'products/fetchProductsByKeyword',
//   async (keyword, thunkAPI) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/products?title=${encodeURIComponent(keyword)}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-type': 'application/json'
//           }
//         }
//       )
//       if (!response.ok) {
//         const error = await response.text()
//         return thunkAPI.rejectWithValue(error)
//         // throw new Error('Algo salio mal')
//       }
//       const data = await response.json()
//       return data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// )

// const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     productsByCategory: [],
//     productById: [],
//     productsByKeyword: [],
//     searchResults: false,
//     category: [],
//     status: 'idle',
//     loading: false,
//     error: null
//   },
//   reducers: {
//     addToSearchResults: (state, action) => {
//       state.searchResults = true
//       state.searchResults = action.payload
//     },
//     addToproductsByKeyword: (state, action) => {
//       state.productsByKeyword = []
//       state.productsByKeyword = action.payload
//     }
//     // aca se puede añadir un reducer para limpiar , dejar null cualuqera de las siguientes inicial state: productsByCategory, productById, productsByKeyword, searchResults. despues a la hora de filtrar por categorias se ponen null los otros y cuando se filtra por una palabra clave se ponen null los demas. entonces si alguno tiene lenght > 0 es poruq es el que se esta filtrando..
//   },
//   extraReducers: (builder) => {
//     // manejo acciones asincronas
//     builder
//       .addCase(getProducts.pending, (state) => {
//         state.status = 'loading'
//         state.loading = true
//       })
//       .addCase(getProducts.fulfilled, (state, action) => {
//         state.state = 'succeeded'
//         state.loading = false
//         state.products = action.payload
//       })
//       .addCase(getProducts.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error
//       })
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = 'loading'
//         state.loading = true
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.state = 'succeeded'
//         state.loading = false
//         state.category = action.payload
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error
//       })
//       .addCase(fetchProductsByCategory.pending, (state) => {
//         state.status = 'loading'
//         state.loading = true
//       })
//       .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
//         state.state = 'succeeded'
//         state.loading = false
//         state.searchResults = action.payload
//       })
//       .addCase(fetchProductsByCategory.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error
//       })
//       .addCase(fetchProductById.pending, (state) => {
//         state.status = 'loading'
//         state.loading = true
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.state = 'succeeded'
//         state.loading = false
//         state.productById = action.payload
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error
//       })
//       .addCase(fetchProductByKeyword.pending, (state) => {
//         state.status = 'loading'
//         state.loading = true
//       })
//       .addCase(fetchProductByKeyword.fulfilled, (state, action) => {
//         state.state = 'succeeded'
//         state.loading = false
//         state.productsByKeyword = action.payload
//       })
//       .addCase(fetchProductByKeyword.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.error
//       })
//   }
// })

// export const { addToSearchResults, addToproductsByKeyword } = productsSlice.actions
// export const selectProducts = (state) => state.products.products
// // export const selectStatus = (state) => state.products.status
// // export const selectLoading = (state) => state.products.loading
// // export const selectError = (state) => state.products.error
// // export const selectCategory = (state) => state.products.category
// export default productsSlice.reducer
