import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colores } from '../../../global/colors'
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validations/validationsScheme';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState("")

  const [triggerSignup, result] = useSignupMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (result.status === "rejected") {
      setFormError("No pudimos crear la cuenta. Puede que el email ya esté en uso.")
    } else if (result.status === "fulfilled") {
      dispatch(setUser(result.data))
    }
  }, [result])

  const onsubmit = async () => {
    try {
      await validationSchema.validate({ email, password, confirmPassword })
      setFormError("")
      triggerSignup({ email, password })
    } catch (validationError) {
      setFormError(validationError.message)
    }
  }

  return (
    <LinearGradient
      colors={['#400962', '#11001B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.title}>Tienda Del Dragon</Text>
      <Text style={styles.subTitle}>Registrate</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colores.blancoCrema}
          placeholder="Email"
          style={styles.textInput}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={colores.blancoCrema}
            placeholder='Password'
            style={styles.passwordTextInput}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={22} color={colores.blancoCrema} />
          </Pressable>
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            placeholderTextColor={colores.blancoCrema}
            placeholder='Repetir password'
            style={styles.passwordTextInput}
            secureTextEntry={!showConfirmPassword}
          />
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          >
            <Icon name={showConfirmPassword ? 'visibility-off' : 'visibility'} size={22} color={colores.blancoCrema} />
          </Pressable>
        </View>
      </View>
      {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{ ...styles.whiteText, ...styles.underLineText }}>Iniciar sesión</Text>
        </Pressable>
      </View>

      <Pressable style={styles.btn} onPress={onsubmit}>
        <Text style={styles.btnText}>Crear cuenta</Text>
      </Pressable>

      <View style={styles.guestOptionContainer}>
        <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
        <Pressable onPress={() => dispatch(setUser({ email: "demo@tiendadragon.com", idToken: "demo", localId: "guest" }))}>
          <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
        </Pressable>
      </View>
    </LinearGradient>
  )
}

export default SignupScreen

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
  passwordInputContainer: {
    justifyContent: 'center',
  },
  passwordTextInput: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 40,
    borderRadius: 16,
    backgroundColor: colores.bordoTitulos,
    width: textInputWidth,
    color: colores.blancoCrema,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  footTextContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  whiteText: {
    color: colores.blancoCrema
  },
  errorText: {
    color: colores.error,
    textAlign: 'center',
    marginHorizontal: 24,
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
