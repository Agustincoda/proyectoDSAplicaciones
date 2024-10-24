import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions } from 'react-native'
import FlatCard from '../componentes/flatcard'
import { useEffect, useState } from 'react'
import { colors } from '../../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../componentes/features'

const CategoriesScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)

    const categories = useSelector(state => state.shopReducer.value.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        if (width > height) {
            setIsPortrait(false)
        } else {
            setIsPortrait(true)
        }
    }, [width, height])

    console.log(isPortrait)

    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.title)) 
                navigation.navigate('Productos')
            }}>
                <FlatCard style={
                    index % 2 == 0
                        ? { ...styles.categoryItemContainer, ...styles.row }
                        : { ...styles.categoryItemContainer, ...styles.rowReverse }
                }>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={width > 400 ? styles.categoryTitle : styles.categoryTitleSmall}>{item.title}</Text>
                </FlatCard>
            </Pressable>
        )
    }

    return (
        <>
            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderCategoryItem}
            />
        </>
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
    categoryTitleSmall: {
        fontSize: 12,
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 80,
    },
    row: {
        flexDirection: 'row',
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    
})
