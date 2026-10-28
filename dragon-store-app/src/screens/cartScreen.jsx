import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useColors } from '../hooks/useColors'
import FlatCard from '../components/flatcard'
import FallbackImage from '../components/fallbackImage'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePostReceiptMutation } from '../services/receiptService'
import { clearCart, removeItem } from '../features/cartSlice'

const CartScreen = ({ navigation }) => {
  const cart = useSelector(state => state.cartReducer.value.cartItems)
  const total = useSelector(state => state.cartReducer.value.total)
  const [triggerPost, result] = usePostReceiptMutation()
  const cartLength = useSelector(state => state.cartReducer.value.cartLenght)
  // Los recibos requieren "auth != null" en las reglas de Firebase, y el
  // usuario invitado no tiene un idToken real, así que no puede confirmar.
  const isGuest = useSelector(state => state.authReducer.value.token === 'demo')
  const [checkoutError, setCheckoutError] = useState("")

  const dispatch = useDispatch()
  const colores = useColors();
  const styles = getStyles(colores);

  const handleConfirm = async () => {
    try {
      setCheckoutError("")
      // Espera la confirmación de Firebase antes de vaciar el carrito:
      // si el POST falla (sin conexión, reglas, etc.) el usuario se
      // queda con su carrito intacto en vez de perderlo sin que la
      // compra se haya guardado.
      await triggerPost({ cart, total, createdAt: Date.now() }).unwrap()
      dispatch(clearCart())
      navigation.navigate("Receipts")
    } catch (error) {
      setCheckoutError("No pudimos confirmar la compra. Probá de nuevo en un momento.")
    }
  }

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total} </Text>
      {isGuest ? (
        <Text style={styles.guestNotice}>Iniciá sesión con una cuenta para poder confirmar la compra</Text>
      ) : (
        <>
          {checkoutError ? <Text style={styles.guestNotice}>{checkoutError}</Text> : null}
          <Pressable
            style={[styles.confirmButton, result.isLoading && styles.confirmButtonDisabled]}
            disabled={result.isLoading}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>{result.isLoading ? 'Confirmando...' : 'Confirmar'}</Text>
          </Pressable>
        </>
      )}
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <FallbackImage
          uri={item.mainImage}
          style={styles.cartImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
        <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
        <Icon
          name="delete"
          size={24}
          color="#FC7A5E"
          style={styles.trashIcon}
          onPress={() => dispatch(removeItem(item.id))}
        />
      </View>
    </FlatCard>
  )

  return (
    <>
      {
        cartLength > 0
          ?
          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
          />
          :
          <View style={styles.cartEmpty}>
            <Text style={styles.cartEmptyText}>Aún no hay productos en el carrito</Text>
          </View>
      }
    </>
  )
}

export default CartScreen

const getStyles = (colores) => StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10
  },
  cartImage: {
    width: 80,
    height: 80
  },
  cartDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.bordoTitulos
  },
  description: {
    marginBottom: 16,
    color: colores.textoPrincipal
  },
  price: {
    color: colores.naranjaGoku
  },
  quantity: {
    color: colores.celesteTitulos
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: colores.naranjaGoku
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginRight: 16,
    color: "#FC7A5E"
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.bordoTitulos
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colores.bordoTitulos,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonText: {
    color: colores.blancoCrema,
    fontSize: 16,
    fontWeight: '700'
  },
  guestNotice: {
    fontSize: 13,
    color: colores.error,
    textAlign: 'center',
    marginBottom: 24,
    marginHorizontal: 16,
  },
  cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8,
    color: colores.bordoTitulos
  },
  cartEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartEmptyText: {
    fontSize: 16,
    color: colores.textoPrincipal
  }
});
