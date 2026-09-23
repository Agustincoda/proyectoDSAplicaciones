import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreen from "../screens/cartScreen"
import Header from "../components/header"
import { useColors } from "../hooks/useColors"

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
  const colores = useColors();
  return (
    <CartStack.Navigator
        screenOptions = {{
            header: ({route})=><Header subtitle={route.name}/>,
            contentStyle: { backgroundColor: colores.fondoPantalla }
        }}
    >
        <CartStack.Screen component={CartScreen} name="Carrito" />
    </CartStack.Navigator>
  )
}

export default CartNavigator