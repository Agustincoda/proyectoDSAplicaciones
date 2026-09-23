import { StyleSheet, TextInput } from 'react-native'
import { useColors } from '../hooks/useColors'

const Search = ({setSearch}) => {
  const colores = useColors();
  const styles = getStyles(colores);
  return (
      <TextInput
        placeholder="Busca un producto"
        placeholderTextColor={colores.grisOscuro}
        onChangeText={(text)=>setSearch(text)}
        style={styles.searchInput}
      />
  )
}

export default Search

const getStyles = (colores) => StyleSheet.create({
    searchInput:{
        margin:5,
        borderWidth:1,
        borderColor: colores.celesteTitulos,
        borderRadius:15,
        padding:5,
        paddingLeft:10,
        backgroundColor: colores.fondoCard,
        color: colores.textoPrincipal,
    }
})
