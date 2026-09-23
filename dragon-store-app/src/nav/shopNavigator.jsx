import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens"
import Header from "../components/header"
import { useColors } from "../hooks/useColors"


const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  const colores = useColors();
  return (
        <Stack.Navigator
            screenOptions = {{
                header: ({route})=><Header subtitle={route.name}/>,
                contentStyle: { backgroundColor: colores.fondoPantalla }
            }}
        >
            <Stack.Screen name="Categorías" 
                component={CategoriesScreen} 
            />
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen name="Producto" component={ProductScreen} />
        </Stack.Navigator>
  )
}

export default ShopNavigator