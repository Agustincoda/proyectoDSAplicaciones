import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profileScreen";
import Header from "../components/header";

const Stack = createNativeStackNavigator()

const ProfileNavigator = ()=>(
    <Stack.Navigator 
    screenOptions={{
        header: ({ route }) => (<Header title="Tienda Del Dragon" subtitle={route.name} />)
    }}>
        <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
)

export default ProfileNavigator