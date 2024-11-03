import { StyleSheet, View, Text } from 'react-native'
import { colores } from '../../global/colors'
import MontserratText from './MontserratText'

const Header = ({ subtitle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Tienda Del Dragon</Text>
      <MontserratText style={styles.subtitle}>{subtitle}</MontserratText>
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
})

