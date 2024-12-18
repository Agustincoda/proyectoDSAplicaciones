import { StyleSheet, Text, FlatList } from 'react-native';
import receipts from '../data/receipt.json';
import FlatCard from '../components/flatcard';
import { colores } from '../../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptsScreen = () => {

  const renderReceiptItem = ({ item }) => {
    let total = item.items.reduce((acumulador, item) => (acumulador += item.quantity * item.price), 0);

    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    return (
      <FlatCard style={styles.receiptContainer}>
        <Text style={styles.title}>Recibo nro: {item.id}</Text>
        <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-AR', dateOptions)} Hs.</Text>
        <Text style={styles.total}>Total: ${total}</Text>
        <Icon name="visibility" size={24} color={colors.grisOscuro} style={styles.viewIcon} />
      </FlatCard>
    );
  };

  return (
    <FlatList
      data={receipts}
      keyExtractor={item => item.id}
      renderItem={renderReceiptItem}
    />
  );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    gap: 10,
  },
  title: {
    fontWeight: '700',
    color: colores.celesteTitulos,
  },
  date: {
    color: colores.negro,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.bordoTitulos,
  },
  viewIcon: {
    alignSelf: 'flex-end',
    color: colores.bordoTitulos
  }
});
