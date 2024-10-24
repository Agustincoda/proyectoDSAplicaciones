import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { CategoriesScreen, ProductsScreen, ProductScreen } from "../pantallas"
import Header from "../componentes/header"


const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (
        <Stack.Navigator
            screenOptions = {{
                header: ({route})=><Header subtitle={route.name}/>
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