import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profileScreen";
import Header from "../components/header";
import { useColors } from "../hooks/useColors";

const Stack = createNativeStackNavigator()

const ProfileNavigator = () => {
    const colores = useColors();
    return (
        <Stack.Navigator
        screenOptions={{
            header: ({ route }) => (<Header title="Tienda Del Dragon" subtitle={route.name} />),
            contentStyle: { backgroundColor: colores.fondoPantalla }
        }}>
            <Stack.Screen name="Perfil" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator