import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ReceiptsScreen from "../screens/receiptScreen"
import Header from "../components/header"
import { useColors } from "../hooks/useColors"

const Stack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
  const colores = useColors();
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => <Header subtitle={route.name} />,
        contentStyle: { backgroundColor: colores.fondoPantalla }
      }}
    >
      <Stack.Screen component={ReceiptsScreen} name="Recibos" />
    </Stack.Navigator>
  )
}

export default ReceiptsNavigator