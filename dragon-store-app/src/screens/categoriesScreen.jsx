import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
import FlatCard from '../components/flatcard'
import { useEffect, useState } from 'react'
import { useColors } from '../hooks/useColors'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService'

const CategoriesScreen = ({ navigation }) => {

    const { width, height } = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    const dispatch = useDispatch()
    const colores = useColors();
    const styles = getStyles(colores);

    useEffect(() => {
        setIsPortrait(width <= height)
    }, [width, height])

    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.title))
                navigation.navigate('Productos')
            }}>
                <FlatCard style={
                    index % 2 === 0
                        ? { ...styles.categoryItemContainer, ...styles.row }
                        : { ...styles.categoryItemContainer, ...styles.rowReverse }
                }>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={width > 400 ? styles.categoryTitle : styles.categoryTitleSmall}>
                        {item.title}
                    </Text>
                </FlatCard>
            </Pressable>
        )
    }

    return (
        <>
            {
                isLoading
                ? <ActivityIndicator size="large" color={colores.textoPrincipal} />
                : error
                ? <Text style={styles.errorText}>Error al cargar las categorías</Text>
                : <FlatList
                    data={categories}
                    keyExtractor={(item, index) => item ? item.id : index}
                    renderItem={renderCategoryItem}
                  />
            }
        </>
    )
}

export default CategoriesScreen

const getStyles = (colores) => StyleSheet.create({
    categoryItemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 12,
        marginVertical: 8,
        padding: 16,
        borderRadius: 20,
        backgroundColor: colores.fondoCard,
    },
    categoryTitle: {
        fontSize: 28,
        fontWeight: "900",
        color: colores.celesteTitulos,
    },
    categoryTitleSmall: {
        fontSize: 16,
        fontWeight: "900",
        color: colores.celesteTitulos,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 16,
    },
    row: {
        flexDirection: 'row',
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    errorText: {
        color: colores.error,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
})
