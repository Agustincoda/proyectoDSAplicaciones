import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colores } from '../../../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authService';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const [triggerLogin, result] = useLoginMutation()

  useEffect(() => {
    if (result.status === "rejected") {
      console.log("Error al iniciar sesión", result)
    } else if (result.status === "fulfilled") {
      console.log("Usuario logueado con éxito")
      dispatch(setUser(result.data))
    }
  }, [result])

  const onsubmit = () => {
    triggerLogin({ email, password })
  }

  return (
    <LinearGradient
      colors={['#400962', '#11001B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.title}>Tienda Del Dragon</Text>
      <Text style={styles.subTitle}>Ingresa</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colores.blancoCrema}
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colores.blancoCrema}
          placeholder='Password'
          style={styles.textInput}
          secureTextEntry
        />
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={{ ...styles.whiteText, ...styles.underLineText }}>Crea una</Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onsubmit}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </Pressable>

      <View style={styles.guestOptionContainer}>
        <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
        <Pressable onPress={() => dispatch(setUser({ email: "demo@tiendadragon.com", token: "demo" }))}>
          <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
        </Pressable>
      </View>
    </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colores.celesteTitulos,
    fontFamily: "PressStart2P",
    fontSize: 24
  },
  subTitle: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: colores.naranjaGoku,
    fontWeight: '700',
    letterSpacing: 3
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: 'center',
  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: colores.bordoTitulos,
    width: textInputWidth,
    color: colores.blancoCrema,
  },
  footTextContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  whiteText: {
    color: colores.blancoCrema
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
  strongText: {
    fontWeight: '900',
    fontSize: 16
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colores.naranjaGoku,
    borderRadius: 16,
    marginTop: 32
  },
  btnText: {
    color: colores.blancoCrema,
    fontSize: 16,
    fontWeight: '700'
  },
  guestOptionContainer: {
    alignItems: 'center',
    marginTop: 64
  }
})
