import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import TabNavigator from "./tabNavigator"
import AuthNavigator from "./authNavigator"

import { useGetProfilePictureQuery } from "../services/userService"
import { setProfilePicture, setUser } from "../features/authSlice"
import { setTheme } from "../features/themeSlice"

import { fetchSession, fetchThemePreference } from "../db"

const MainNavigator = () => {
    const user = useSelector((state) => state.authReducer.value.email)
    const localId = useSelector((state) => state.authReducer.value.localId)
    const isGuest = useSelector((state) => state.authReducer.value.token === 'demo')

    const dispatch = useDispatch()

    // Los invitados no tienen un idToken real, así que esta consulta
    // siempre fallaría por permisos bajo las reglas de Firebase.
    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId, { skip: !localId || isGuest })

    // Si no hay usuario en el estado (recién abriste la app), fija si
    // había una sesión guardada en SQLite ("mantener sesión iniciada").
    // La fila guardada usa la key "token", pero setUser espera "idToken"
    // — por eso se remapea acá en vez de pasarle la fila tal cual.
    useEffect(() => {
        if (!user) {
            (async () => {
                try {
                    const session = await fetchSession()
                    if (session.length) {
                        dispatch(setUser({
                            email: session[0].email,
                            idToken: session[0].token,
                            localId: session[0].localId
                        }))
                    }
                } catch (error) {
                    console.log("Error al obtener la sesión", error)
                }
            })()
        }
    }, [user])

    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])

    // Restaura el tema claro/oscuro guardado en SQLite (ver
    // saveThemePreference en profileScreen.jsx), independiente de si
    // hay o no una sesión iniciada.
    useEffect(() => {
        (async () => {
            try {
                const preference = await fetchThemePreference()
                if (preference.length) {
                    dispatch(setTheme(!!preference[0].isDark))
                }
            } catch (error) {
                console.log("Error al obtener la preferencia de tema", error)
            }
        })()
    }, [])

    return (
        <NavigationContainer>
            {user ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default MainNavigator
