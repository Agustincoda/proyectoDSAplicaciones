import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import FlatCard from '../components/flatcard';
import { useColors } from '../hooks/useColors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/search';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../services/shopService';
import { setProductId } from '../features/shopSlice';

const ProductsScreen = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const category = useSelector(state => state.shopReducer.value.categorySelected);
    const dispatch = useDispatch();
    const colores = useColors();
    const styles = getStyles(colores);

    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category);

    useEffect(() => {
        console.log("Categoría seleccionada:", category);
        console.log("Productos filtrados por categoría (desde Firebase):", productsFilteredByCategory);
    
        // Filtra elementos nulos en los productos obtenidos
        const validProducts = (productsFilteredByCategory || []).filter(product => product !== null);
    
        // Filtra según la búsqueda si hay algún término de búsqueda
        if (search) {
            const filteredProducts = validProducts.filter(product =>
                product.nombre.toLowerCase().includes(search.toLowerCase())
            );
            console.log("Productos filtrados por búsqueda:", filteredProducts);
            setProductsFiltered(filteredProducts);
        } else {
            setProductsFiltered(validProducts);
        }
    }, [search, productsFilteredByCategory, category]);
    


    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => {
            dispatch(setProductId(item.id));
            navigation.navigate("Producto");
        }}>
            <FlatCard style={styles.productContainer}>
                <View style={styles.productImageContainer}>
                    <Image
                        source={{ uri: item.Imagen }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDescription}>
                    <Text style={styles.productTitle}>{item.nombre}</Text>
                    <Text style={styles.shortDescription}>{item.Descripcion}</Text>
                    <View style={styles.tags}>
                        <Text style={styles.tagText}>Tags: </Text>
                        <FlatList
                            style={styles.tags}
                            data={item.Tags}
                            keyExtractor={(tag, index) => `${tag}-${index}`}
                            renderItem={({ item: tag }) => (<Text style={styles.tagText}>{tag}</Text>)}
                        />
                    </View>
                    {item.Descuento > 0 && (
                        <View style={styles.discount}>
                            <Icon name="whatshot" size={16} color={colores.blancoCrema} />
                            <Text style={styles.discountText}>{item.Descuento}% OFF</Text>
                        </View>
                    )}
                    {item.Stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                    <Text style={styles.price}>Precio: $ {item.Precio}</Text>
                </View>
            </FlatCard>
        </Pressable>
    );

    return (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" color={colores.naranjaGoku} />
            ) : error ? (
                <Text>Error al cargar las categorías</Text>
            ) : (
                <>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
                    </Pressable>
                    <Search setSearch={setSearch} />
                    <FlatList
                        data={productsFiltered}
                        keyExtractor={item => item.id}
                        renderItem={renderProductItem}
                    />
                </>
            )}
        </>
    );
};

export default ProductsScreen;

const getStyles = (colores) => StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 10,
        alignItems: "center",
        gap: 10
    },
    productImageContainer: {
        width: 100,
        height: 100,
        backgroundColor: colores.fondoPantalla,
        borderRadius: 12,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%'
    },
    productDescription: {
        width: "80%",
        padding: 20,
        gap: 10
    },
    productTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 18,
        color: colores.bordoTitulos
    },
    shortDescription: {
        color: colores.textoPrincipal
    },
    tags: {
        flexDirection: 'row',
        gap: 5
    },
    tagText: {
        fontWeight: '600',
        fontSize: 12,
        color: colores.textoPrincipal
    },
    price: {
        fontWeight: '800',
        fontSize: 18,
        color: colores.naranjaGoku
    },
    discount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#FF3B1F',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start'
    },
    discountText: {
        color: colores.blancoCrema,
        fontWeight: '800',
        fontSize: 13,
    },
    noStockText: {
        color: colores.error,
        fontWeight: '700',
    },
    goBack: {
        padding: 10,
        color: colores.textoPrincipal
    }
});
