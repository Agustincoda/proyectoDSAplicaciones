import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useColors } from '../hooks/useColors'
import MontserratText from './montserratText'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/authSlice'
import { clearCart } from '../features/cartSlice'
import { clearSessions } from '../db'
import { receiptApi } from '../services/receiptService'
import { userApi } from '../services/userService'

const Header = ({ subtitle }) => {
  const user = useSelector((state) => state.authReducer.value.email)
  const dispatch = useDispatch()
  const colores = useColors();
  const styles = getStyles(colores);

  const onLogout = () => {
    dispatch(clearUser())
    // El carrito y las cachés de recibos/foto de perfil son por usuario:
    // sin esto, si otra persona inicia sesión en el mismo dispositivo
    // sin cerrar la app, vería (al menos momentáneamente) los datos de
    // la sesión anterior.
    dispatch(clearCart())
    dispatch(receiptApi.util.resetApiState())
    dispatch(userApi.util.resetApiState())
    clearSessions().catch(() => {})
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Tienda Del Dragon</Text>
      <MontserratText style={styles.subtitle}>{subtitle}</MontserratText>
      {user && (
        <Pressable onPress={onLogout} style={styles.access}>
          <Icon name="logout" size={16} color={colores.textoPrincipal} />
        </Pressable>
      )}
    </View>
  )
}

export default Header

const getStyles = (colores) => StyleSheet.create({
  headerContainer: {
    height: 72,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.fondoHeader,
    shadowColor: colores.negro,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colores.bordoTitulos,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.naranjaGoku,
  },
  access: {
    position: 'absolute',
    top: 12,
    right: 16,
  },
})
