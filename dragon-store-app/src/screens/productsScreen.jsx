import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import FlatCard from '../components/flatcard';
import { colores } from '../../global/colors';
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
                <View>
                    <Image
                        source={{ uri: item.Imagen }} // Ajuste aquí
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDescription}>
                    <Text style={styles.productTitle}>{item.nombre}</Text> {/* Ajuste aquí */}
                    <Text style={styles.shortDescription}>{item.Descripcion}</Text> {/* Ajuste aquí */}
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
                            <Text style={styles.discountText}>Descuento {item.Descuento}%</Text>
                        </View>
                    )}
                    {item.Stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                    <Text style={styles.price}>Precio: $ {item.Precio}</Text> {/* Ajuste aquí */}
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

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 10,
        alignItems: "center",
        gap: 10
    },
    productImage: {
        width: 100,
        height: 100
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
        color: colores.negro
    },
    tags: {
        flexDirection: 'row',
        gap: 5
    },
    tagText: {
        fontWeight: '600',
        fontSize: 12,
        color: colores.negro
    },
    price: {
        fontWeight: '800',
        fontSize: 18,
        color: colores.naranjaGoku
    },
    discount: {
        backgroundColor: colores.naranjaGoku,
        padding: 8,
        borderRadius: 12,
        alignSelf: 'flex-start'
    },
    discountText: {
        color: colores.blancoCrema
    },
    noStockText: {
        color: 'red'
    },
    goBack: {
        padding: 10,
        color: colores.negro
    }
});
