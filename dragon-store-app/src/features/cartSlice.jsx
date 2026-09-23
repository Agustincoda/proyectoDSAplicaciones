import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "./functions";

// action.payload siempre tiene que ser un cart item ya normalizado
// (ver product_to_cart_item en functions.jsx), no un producto crudo de
// Firebase — si no, item.price/item.quantity van a ser undefined y el
// total termina en NaN.
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems:[],
            user:"demo",
            total: null,
            cartLenght:0,
            updatedAt: new Date().toLocaleString()
        }
    },
    reducers: {
        addItem: (state,action)=>{
            const productInCart = state.value.cartItems.find(item=>item.id===action.payload.id)
            if(!productInCart){
                state.value.cartItems.push(action.payload) //action.payload es el producto
            }else{
                state.value.cartItems.forEach(item=>{
                    if(item.id===action.payload.id){
                        item.quantity += 1
                    }
                })
            }

            const total = calculate_total_price(state.value.cartItems)
            // cartLenght es la cantidad TOTAL de unidades (sumando
            // cantidades), no la cantidad de productos distintos — así el
            // contador del carrito refleja bien cuánto hay adentro.
            const cartLenght = state.value.cartItems.reduce((sum, item) => sum + item.quantity, 0)

            state.value = {
                ...state.value,
                total,
                cartLenght,
                updatedAt: new Date().toLocaleString()
            }

        },
        removeItem: (state,action)=>{
            state.value.cartItems = state.value.cartItems.filter(item=>item.id!==action.payload)
            state.value.total = calculate_total_price(state.value.cartItems)
            state.value.cartLenght = state.value.cartItems.reduce((sum, item) => sum + item.quantity, 0)
        },
        clearCart: (state) => {
            state.value.cartItems=[]
            state.value.total=null
            state.value.cartLenght = 0
        }
    }
})

export const {addItem, removeItem,clearCart} = cartSlice.actions

export default cartSlice.reducer