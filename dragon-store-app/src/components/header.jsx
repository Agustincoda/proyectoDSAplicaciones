import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useColors } from '../hooks/useColors'
import MontserratText from './montserratText'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/authSlice'
import { clearSessions } from '../db'

const Header = ({ subtitle }) => {
  const user = useSelector((state) => state.authReducer.value.email)
  const dispatch = useDispatch()
  const colores = useColors();
  const styles = getStyles(colores);

  const onLogout = () => {
    dispatch(clearUser())
    clearSessions()
      .then(() => console.log("Sesión eliminada"))
      .catch((error) => console.log("Error al eliminar la sesión"))
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
