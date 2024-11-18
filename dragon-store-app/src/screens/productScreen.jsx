import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colores } from '../../global/colors';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cartSlice';
import { useGetProductsByCategoryQuery } from '../services/shopService';

const ProductScreen = ({ route, navigation }) => {
    const { category } = route.params;
    const { data: products, error, isLoading } = useGetProductsByCategoryQuery(category);
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();

    return (
        <>
            {
                isLoading
                    ? <ActivityIndicator size="large" color={colores.verdeNeon} />
                    : error
                        ? <Text>Error al cargar productos de la categoría</Text>
                        :
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
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
                                        onPress={() => dispatch(addItem({ ...item, quantity: 1 }))}
                                    >
                                        <Text style={styles.textAddToCart}>Agregar al carrito</Text>
                                    </Pressable>
                                </ScrollView>
                            )}
                        />
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
