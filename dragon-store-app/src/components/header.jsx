import { StyleSheet, View, Text, Pressable } from 'react-native'
import { colores } from '../../global/colors'
import MontserratText from './montserratText'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/authSlice'
import { clearSessions } from '../db'

const Header = ({ subtitle }) => {
  const user = useSelector((state) => state.authReducer.value.email)
  const dispatch = useDispatch()

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
          <Icon name="logout" size={16} color="#fff" />
        </Pressable>
      )}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.blancoCrema,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colores.bordoTitulos,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colores.blanco,
  },
  access: {
    position: 'absolute',
    top: 10,
    right: 16,
  },
})
