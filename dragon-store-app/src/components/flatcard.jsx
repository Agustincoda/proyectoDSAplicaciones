import { StyleSheet, View } from "react-native";
import { useColors } from "../hooks/useColors";

const FlatCard = ({ children, style }) => {
    const colores = useColors();
    const styles = getStyles(colores);
    return (
        <View style={{ ...styles.cardContainer, ...style }}>
            {children}
        </View>
    );
};

export default FlatCard;

const getStyles = (colores) => StyleSheet.create({
    cardContainer: {
        backgroundColor: colores.fondoCard,
        shadowColor: colores.negro,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: { width: 3, height: 5 },
        elevation: 10
    }
});
