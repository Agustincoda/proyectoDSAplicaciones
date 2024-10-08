import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import products from '../componentes/productos.json';
import FlatCard from '../componentes/flatcard';
import { colores } from "../../global/colors";



const ProductsScreen = ({ category, setCategory }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);

    useEffect(() => {
        const productsTempFiltered = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        setProductsFiltered(productsTempFiltered);
    }, [category]);

    const renderProductItem = ({ item }) => {
        return (
            <FlatCard style={styles.productContainer}>
                <View>
                    <Image
                        source={{ uri: item.mainImage }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productDescription}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                    <View style={styles.tags}>
                        <Text style={styles.tagText}>Tags: </Text>
                        <FlatList
                            style={styles.tags}
                            data={item.tags}
                            keyExtractor={() => Math.random()}
                            renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                        />
                    </View>
                    {item.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>Descuento {item.discount}%</Text></View>}
                    {item.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
                    <Text style={styles.price}>Precio: $ {item.price}</Text>
                </View>
            </FlatCard>
        );
    };

    return (
        <>
            <Pressable onPress={() => setCategory("")}><Text>Volver</Text></Pressable>
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id}
                renderItem={renderProductItem}
            />
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
        color: colores.celesteTitulos // Aplicamos el color de título
    },
    shortDescription: {
        color: colores.negro // Aquí puedes definir algún color si lo necesitas
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
        color: colores.bordoTitulos // Aplicamos el color de precio
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
        color: 'red' // Este puede ser personalizado si deseas un color específico
    }
});
