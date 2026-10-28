import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import { useState } from 'react'
import { useColors } from '../hooks/useColors'
import CameraIcon from '../components/cameraIcon'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { setProfilePicture } from '../features/authSlice'
import { toggleTheme } from '../features/themeSlice'
import { usePutProfilePictureMutation } from '../services/userService';
import { saveThemePreference } from '../db';

const ProfileScreen = () => {

    const user = useSelector(state=>state.authReducer.value.email)
    const image = useSelector(state=>state.authReducer.value.profilePicture)
    const localId = useSelector(state=>state.authReducer.value.localId)
    // La foto de perfil requiere "auth != null" en las reglas de Firebase,
    // y el usuario invitado no tiene un idToken real.
    const isGuest = useSelector(state=>state.authReducer.value.token === 'demo')
    const isDark = useSelector(state=>state.themeReducer.value.isDark)
    const dispatch = useDispatch()
    const colores = useColors();
    const styles = getStyles(colores);

    const [triggerPutProfilePicture,result] = usePutProfilePictureMutation()
    const [photoError, setPhotoError] = useState("")

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return false
        return true
    }

    const pickImage = async () =>{
        const permissionOk = await verifyCameraPermissions()
        if(!permissionOk){
            setPhotoError("Necesitamos permiso de cámara para sacar la foto.")
            return
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            base64: true,
            quality: 0.7
        })

        if(pickerResult.canceled) return

        const previousImage = image
        const newImage = `data:image/jpeg;base64,${pickerResult.assets[0].base64}`
        setPhotoError("")
        dispatch(setProfilePicture(newImage))
        try {
            // Espera que Firebase confirme el guardado: si falla, se
            // vuelve a la foto anterior en vez de dejar al usuario
            // creyendo que la nueva quedó guardada.
            await triggerPutProfilePicture({ image: newImage, localId }).unwrap()
        } catch (error) {
            dispatch(setProfilePicture(previousImage))
            setPhotoError("No pudimos guardar tu foto de perfil. Probá de nuevo.")
        }
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{(user || "?").charAt(0).toUpperCase()}</Text>
                }
                {!isGuest && (
                    <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                        <CameraIcon />
                    </Pressable>
                )}
            </View>
            <Text style={styles.profileData}>Email: {user}</Text>
            {isGuest && <Text style={styles.guestNotice}>Iniciá sesión con una cuenta para poder subir una foto</Text>}
            {photoError ? <Text style={styles.guestNotice}>{photoError}</Text> : null}
            <View style={styles.themeToggleContainer}>
                <Text style={styles.themeToggleText}>Modo oscuro</Text>
                <Pressable onPress={() => {
                    dispatch(toggleTheme())
                    // Mejor esfuerzo: si no se puede guardar, el tema
                    // vuelve a su valor por defecto la próxima vez que
                    // se abra la app, pero el cambio actual funciona igual.
                    saveThemePreference(!isDark).catch(() => {})
                }}>
                    <Icon name={isDark ? 'toggle-on' : 'toggle-off'} size={48} color={isDark ? colores.naranjaGoku : colores.grisOscuro} />
                </Pressable>
            </View>
        </View>
    )
}

export default ProfileScreen

const getStyles = (colores) => StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    themeToggleContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginTop: 32,
    },
    themeToggleText: {
        color: colores.textoPrincipal,
        fontSize: 16,
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colores.bordoTitulos,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colores.blancoCrema,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16,
        color: colores.textoPrincipal
    },
    guestNotice: {
        fontSize: 13,
        color: colores.error,
        textAlign: 'center',
        marginHorizontal: 16,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    }
});
