import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './features'

export const store = configureStore({
    reducer: { 
        shopReducer
    }
})

