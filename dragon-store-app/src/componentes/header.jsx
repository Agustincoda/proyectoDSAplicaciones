import { StyleSheet, View, Text } from "react-native";
import { colores } from "../../global/colors";

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Tienda Del Dragon</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        height: 150,
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: colores.blancoCrema 
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: colores.bordoTitulos 
    }
});
