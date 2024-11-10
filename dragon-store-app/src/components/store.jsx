import { configureStore } from '@reduxjs/toolkit'
import shopReducer from '../features/shopSlice'
import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'
import { shopApi } from '../services/shopService'
import { receiptApi } from '../services/receiptService'
import { authApi } from '../services/authService'
import { userApi } from '../services/userService'

export const store = configureStore({
  reducer: { 
      shopReducer,
      cartReducer,
      authReducer,
      [shopApi.reducerPath] : shopApi.reducer,
      [receiptApi.reducerPath] : receiptApi.reducer,
      [authApi.reducerPath] : authApi.reducer,
      [userApi.reducerPath] : userApi.reducer,
      
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(shopApi.middleware)
  .concat(receiptApi.middleware)
  .concat(authApi.middleware)
  .concat(userApi.middleware)
})