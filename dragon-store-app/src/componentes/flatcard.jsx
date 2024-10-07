import { StyleSheet,View,Text } from "react-native";
import { colores } from "../../global/colors";

const Flatcard =({children,style})=>{
return(
    <View style={{...styles.cardContainer,...style}}>
     {children}   
    </View>
)

}

export default Flatcard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: colores.blancoCrema,
        shadowColor:colores.negro,
        shadowOpacity:1,
        shadowRadius:1,
        shadowOffset:{width:3,height:5},
        elevation:5
    }
})