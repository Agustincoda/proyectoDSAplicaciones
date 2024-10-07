import { StyleSheet, Text, View, FlatList } from 'react-native'
import { StyleSheet, Text, View, FlatList,Image } from 'react-native'
import categories from "../componentes/categories.json"
import FlatCard  from "../componentes/flatcard"

const CategoriesScreen = () => {
   
    const renderCategoryItem = ({item,index}) =>{
     
        return(
           
            <FlatCard style={
               
                index%2==0
                ?
                {...styles.categoryItemContainer, ... styles.row}
                :
                {...styles.categoryItemContainer, ... styles.rowReverse}
            }>
                <Image
                    source={{uri:item.image }}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.categoryTitle}>{item.title}</Text>
            </FlatCard>
        )
    }

    return (
        <View style={styles.categoriesContainer}>
            <FlatList
                data={categories}
                keyExtractor={item=>item.id}
                renderItem={renderCategoryItem}
            />
        </View>
    )
}


export default CategoriesScreen


const styles = StyleSheet.create({

    categoryItemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
      },
      categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
      },
    image:{
        width:150,
        height:80
    },
    row:{
        flexDirection: 'row'
    },
    rowReverse:{
        flexDirection:'row-reverse'
    }
})