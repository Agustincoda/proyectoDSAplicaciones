import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colores } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cartSlice';
import { product_to_cart_item } from '../features/functions';
import { useGetProductQuery } from '../services/shopService';

const ProductScreen = ({ navigation }) => {
    const productId = useSelector((state) => state.shopReducer.value.productId);
    const { data: item, error, isLoading } = useGetProductQuery(productId);
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();

    return (
        <>
            {
                isLoading
                    ? <ActivityIndicator size="large" color={colores.verdeNeon} />
                    : error || !item
                        ? <Text>Error al cargar el producto</Text>
                        :
                        <ScrollView style={styles.productContainer}>
                            <Pressable onPress={() => navigation.goBack()}>
                                <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
                            </Pressable>
                            <Text style={styles.textBrand}>{item.nombre}</Text>
                            <Text style={styles.textTitle}>{item.nombre}</Text>
                            <Image
                                source={{ uri: item.Imagen }}
                                alt={item.nombre}
                                style={{ width: '100%', height: width * 0.7 }}
                                resizeMode='contain'
                            />
                            <Text style={styles.longDescription}>{item.Descripcion}</Text>
                            <View style={styles.tagsContainer}>
                                <View style={styles.tags}>
                                    <Text style={styles.tagText}>Tags : </Text>
                                    {item.Tags?.map(tag => <Text key={tag} style={styles.tagText}>{tag}</Text>)}
                                </View>
                                {item.Descuento > 0 && (
                                    <View style={styles.discount}>
                                        <Text style={styles.discountText}>- {item.Descuento} %</Text>
                                    </View>
                                )}
                            </View>
                            {item.Stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                            <Text style={styles.price}>Precio: {item.Precio}</Text>
                            <Pressable
                                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
                                disabled={item.Stock <= 0}
                                onPress={() => dispatch(addItem(product_to_cart_item(item)))}
                            >
                                <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                            </Pressable>
                        </ScrollView>
            }
        </>
    )
};

export default ProductScreen;

const styles = StyleSheet.create({
    goBack: {
        padding: 8,
        color: colores.negro
    },
    productContainer: {
        paddingHorizontal: 16
    },
    textBrand: {
        color: colores.negro,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colores.bordoTitulos
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
        color: colores.negro
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 14,
        color: colores.celesteTitulos
    },
    discount: {
        backgroundColor: colores.naranjaGoku,
        width: 64,
        height: 64,
        borderRadius: 64,
    },
    discountText: {
        color: colores.blancoCrema,
        textAlign: 'center',
        verticalAlign: 'center'
    },
    noStockText: {
        color: 'red'
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16,
        color: colores.naranjaGoku
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colores.bordoTitulos,
        borderRadius: 16,
        marginVertical: 16
    },
    textAddToCart: {
        color: colores.blancoCrema,
        fontSize: 24,
        textAlign: 'center',
    }
});
