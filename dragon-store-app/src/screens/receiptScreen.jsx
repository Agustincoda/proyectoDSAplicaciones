import { StyleSheet, Text, FlatList, ActivityIndicator, View } from 'react-native';
import FlatCard from '../components/flatcard';
import { colores } from '../../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetReceiptsQuery } from '../services/receiptService';

const ReceiptsScreen = () => {
  const { data: receipts, error, isLoading } = useGetReceiptsQuery();

  const renderReceiptItem = ({ item }) => {
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
        <Text style={styles.total}>Total: ${item.total}</Text>
        <Icon name="visibility" size={24} color={colores.grisOscuro} style={styles.viewIcon} />
      </FlatCard>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={colores.naranjaGoku} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error al cargar los recibos</Text>;
  }

  if (!receipts || receipts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Todavía no tenés recibos</Text>
      </View>
    );
  }

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
  },
  errorText: {
    color: colores.error,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: colores.negro
  }
});
