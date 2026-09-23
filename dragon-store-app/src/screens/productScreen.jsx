import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useColors } from '../hooks/useColors';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { addItem } from '../features/cartSlice';
import { product_to_cart_item } from '../features/functions';
import { useGetProductQuery } from '../services/shopService';

const ProductScreen = ({ navigation }) => {
    // El producto a mostrar se identifica por Redux (seteado con
    // setProductId en productsScreen.jsx al tocar una card), no por un
    // parámetro de navegación: así esta pantalla no depende de que
    // quien la abra recuerde pasarle los params correctos.
    const productId = useSelector((state) => state.shopReducer.value.productId);
    const { data: item, error, isLoading } = useGetProductQuery(productId);
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const colores = useColors();
    const styles = getStyles(colores);

    const [showAddedToast, setShowAddedToast] = useState(false);
    const toastTimeout = useRef(null);

    const handleAddToCart = () => {
        dispatch(addItem(product_to_cart_item(item)));
        setShowAddedToast(true);
        clearTimeout(toastTimeout.current);
        toastTimeout.current = setTimeout(() => setShowAddedToast(false), 1800);
    };

    const outOfStock = item?.Stock <= 0;

    return (
        <View style={styles.screen}>
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
                            <Text style={styles.textTitle}>{item.nombre}</Text>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: item.Imagen }}
                                    alt={item.nombre}
                                    style={styles.image}
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.longDescription}>{item.Descripcion}</Text>
                            <View style={styles.tagsContainer}>
                                <View style={styles.tags}>
                                    <Text style={styles.tagText}>Tags : </Text>
                                    {item.Tags?.map(tag => <Text key={tag} style={styles.tagText}>{tag}</Text>)}
                                </View>
                                {item.Descuento > 0 && (
                                    <View style={styles.discount}>
                                        <Icon name="whatshot" size={20} color={colores.blancoCrema} />
                                        <Text style={styles.discountText}>{item.Descuento}%</Text>
                                    </View>
                                )}
                            </View>
                            {outOfStock && <Text style={styles.noStockText}>Sin Stock</Text>}
                            <Text style={styles.price}>Precio: {item.Precio}</Text>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.addToCartButton,
                                    outOfStock && styles.addToCartButtonDisabled,
                                    !outOfStock && pressed && { opacity: 0.95 }
                                ]}
                                disabled={outOfStock}
                                onPress={handleAddToCart}
                            >
                                <Text style={styles.textAddToCart}>{outOfStock ? 'Sin stock disponible' : 'Agregar al carrito'}</Text>
                            </Pressable>
                        </ScrollView>
            }
            {showAddedToast && (
                <View style={styles.toast}>
                    <Icon name="check-circle" size={20} color={colores.blancoCrema} />
                    <Text style={styles.toastText}>Agregado al carrito</Text>
                </View>
            )}
        </View>
    )
};

export default ProductScreen;

const getStyles = (colores) => StyleSheet.create({
    screen: {
        flex: 1,
    },
    goBack: {
        padding: 8,
        color: colores.textoPrincipal
    },
    productContainer: {
        paddingHorizontal: 20
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colores.bordoTitulos,
        marginTop: 8,
    },
    imageContainer: {
        width: '100%',
        maxWidth: 340,
        aspectRatio: 1,
        alignSelf: 'center',
        backgroundColor: colores.fondoCard,
        borderRadius: 16,
        overflow: 'hidden',
        marginVertical: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    longDescription: {
        fontSize: 16,
        lineHeight: 24,
        paddingVertical: 8,
        paddingHorizontal: 4,
        color: colores.textoPrincipal
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 4,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        flexShrink: 1,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 14,
        color: colores.celesteTitulos
    },
    discount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        backgroundColor: '#FF3B1F',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    discountText: {
        color: colores.blancoCrema,
        fontWeight: '800',
        fontSize: 15,
    },
    noStockText: {
        color: colores.error,
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 8,
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
    addToCartButtonDisabled: {
        backgroundColor: colores.grisOscuro,
    },
    textAddToCart: {
        color: colores.blancoCrema,
        fontSize: 24,
        textAlign: 'center',
    },
    toast: {
        position: 'absolute',
        bottom: 24,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colores.bordoTitulos,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
        elevation: 10,
        shadowColor: colores.negro,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    toastText: {
        color: colores.blancoCrema,
        fontWeight: '700',
        fontSize: 15,
    }
});
