import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreen from "../pantallas/carrito"
import Header from "../componentes/header"

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <CartStack.Navigator
        screenOptions = {{
            header: ({route})=><Header subtitle={route.name}/>
        }}
    >
        <CartStack.Screen component={CartScreen} name="Carrito" />
    </CartStack.Navigator>
  )
}

export default CartNavigator