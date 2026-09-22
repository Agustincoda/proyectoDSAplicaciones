import { createSlice } from "@reduxjs/toolkit"

// El "modo invitado" (login/signUp screens) despacha setUser con
// idToken: 'demo' en vez de un token real de Firebase. No es una sesión
// autenticada de verdad: sirve para navegar el catálogo, pero cualquier
// pantalla que escriba en Firebase (carrito, foto de perfil) debe
// chequear este valor y bloquear la acción, porque las reglas de la
// base de datos van a rechazarla igual.
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email: null,
            token: null,
            localId: "",
            profilePicture: ""
        }
    },
    reducers: {
        // El payload usa los nombres de campo que devuelve la API de
        // Firebase Auth (idToken, localId) para poder pasarle result.data
        // directo desde el login/signup sin transformarlo.
        setUser: (state, action) => {
            state.value.email = action.payload.email
            state.value.token = action.payload.idToken
            state.value.localId = action.payload.localId
        },
        clearUser: (state) => {
            state.value.email = null
            state.value.token = null
            state.value.localId = ""
            state.value.profilePicture = ""
        },
        setProfilePicture: (state, action) => {
            state.value.profilePicture = action.payload
        }
    }
})

export const { setUser, clearUser, setProfilePicture } = authSlice.actions

export default authSlice.reducer
