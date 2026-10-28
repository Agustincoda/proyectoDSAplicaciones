import { Component } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colores } from '../../global/colors';

// React Native no tiene una pantalla de error por defecto: si un
// render tira una excepción sin esto, la app se cierra o queda en una
// pantalla roja. Es una class component porque getDerivedStateFromError
// y componentDidCatch no tienen equivalente en hooks todavía.
class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Error atrapado por ErrorBoundary', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Algo salió mal</Text>
                    <Text style={styles.message}>
                        Ocurrió un error inesperado. Probá de nuevo.
                    </Text>
                    <Pressable
                        style={styles.button}
                        onPress={() => this.setState({ hasError: false })}
                    >
                        <Text style={styles.buttonText}>Reintentar</Text>
                    </Pressable>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: colores.fondoPantalla,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: colores.bordoTitulos,
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: colores.textoPrincipal,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: colores.naranjaGoku,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
    },
    buttonText: {
        color: colores.blancoCrema,
        fontWeight: '700',
    },
});
