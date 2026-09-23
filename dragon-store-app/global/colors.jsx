// Paletas de tema. Los nombres de las claves son los mismos en ambos
// modos (son roles semánticos: "el color del título", "el fondo de
// pantalla"), lo que cambia es el valor concreto para que cada uno
// tenga buen contraste en su propio fondo. "blancoCrema" es la
// excepción: se usa fijo en Login/Signup (que siempre tienen el
// mismo gradiente oscuro, sin importar el tema elegido), así que no
// varía entre paletas.
export const coloresClaro = {
    naranjaGoku: "#FF934F",
    negro: "#1A1A1A",
    blanco: "#FFFFFF",
    blancoCrema: "#F0F3BD",
    celesteTitulos: "#0E7C86",
    bordoTitulos: "#A33B20",
    verdeNeon: "#39FF14",
    fondoCard: "#FFE8D6",
    fondoPantalla: "#FBF4E8",
    fondoHeader: "#F0F3BD",
    textoPrincipal: "#1A1A1A",
    grisOscuro: "#4A4A4A",
    error: "#D32F2F"
}

export const coloresOscuro = {
    naranjaGoku: "#FF934F",
    negro: "#1A1A1A",
    blanco: "#FFFFFF",
    blancoCrema: "#F0F3BD",
    celesteTitulos: "#00E8FC",
    bordoTitulos: "#FF7A50",
    verdeNeon: "#39FF14",
    fondoCard: "#3A1B52",
    fondoPantalla: "#1B0B2E",
    fondoHeader: "#2C1044",
    textoPrincipal: "#F0F3BD",
    grisOscuro: "#C7C7C7",
    error: "#FF6B6B"
}

// Mantenido para lo que no depende del tema (p. ej. cameraIcon.jsx,
// un ícono decorativo siempre oscuro).
export const colores = coloresClaro
