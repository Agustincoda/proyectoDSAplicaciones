# Tienda Del Dragon

App de e-commerce hecha con Expo / React Native, ambientada en Dragon Ball: remeras, buzos, anillos, medias y coleccionables. Proyecto de la materia Desarrollo de Software en Aplicaciones.

## Stack

- **Expo SDK 51** / React Native 0.74
- **Redux Toolkit** + **RTK Query** para estado global y llamadas a la API
- **React Navigation** (stack + bottom tabs)
- **Firebase Realtime Database** como backend (catálogo, recibos, fotos de perfil)
- **Firebase Authentication** (Identity Toolkit REST API) para login/registro
- **expo-sqlite** para persistir la sesión localmente ("mantener sesión iniciada")
- **yup** para validar los formularios de login/registro

## Requisitos

- Node.js y npm
- La app [Expo Go](https://expo.dev/go) en el celular, o un emulador Android/iOS configurado

## Cómo correrlo

```bash
cd dragon-store-app
npm install
npx expo start
```

Escaneá el QR con Expo Go, o presioná `a` / `i` en la terminal para abrir el emulador Android/iOS.

## Estructura del proyecto

```
dragon-store-app/
├── App.jsx                 # entry point: carga fuentes, crea la tabla de sesión, monta el store
├── global/colors.jsx        # paleta de colores de toda la app
├── src/
│   ├── components/          # piezas de UI reutilizables (Header, FlatCard, Search, ...)
│   ├── db/                  # persistencia local de sesión con expo-sqlite
│   ├── features/            # slices de Redux (auth, cart, shop) + helpers
│   ├── firebase/            # URLs y API key del proyecto de Firebase
│   ├── nav/                 # árbol de navegación (stacks + tabs)
│   ├── screens/              # pantallas de la app
│   ├── services/            # RTK Query: llamadas a Firebase (auth, shop, receipts, user)
│   └── validations/          # esquemas de validación de formularios (yup)
```

## Funcionalidades

- **Catálogo**: categorías → productos por categoría → detalle de producto, todo desde Firebase Realtime Database.
- **Carrito**: agregar/sacar productos, cantidades, total calculado, checkout que genera un recibo.
- **Recibos**: historial real de compras, guardado y leído desde Firebase.
- **Cuenta**: login, registro y "modo invitado" para solo mirar el catálogo sin crear cuenta.
- **Perfil**: foto de perfil tomada con la cámara, subida a Firebase.

### Modo invitado — limitación a propósito

El botón "Ingresá como invitado" arma una sesión falsa en el estado de la app (no es una cuenta real de Firebase Authentication), pensado solo para poder navegar el catálogo sin registrarse. Por eso, **un invitado no puede confirmar una compra ni subir foto de perfil**: esas dos acciones escriben en Firebase, y las reglas de seguridad de la base de datos exigen un usuario autenticado de verdad (`auth != null`). La UI se lo avisa al usuario en vez de fallar en silencio.

## Firebase: seguridad

Las credenciales en `src/firebase/database.jsx` (URL de la base y API key) son las que Firebase espera que viajen dentro del cliente — no son secretas en sí mismas. Lo que protege los datos son las **reglas de la Realtime Database**, configuradas en la consola de Firebase para que:

- El catálogo (`products`, `categories`) sea de lectura pública.
- `receipts` y `profilePictures` solo se puedan leer/escribir con un usuario autenticado.
- Todo lo demás quede cerrado por defecto.

Si en algún momento se resetean a "modo test" (`.read: true, .write: true` en la raíz), hay que volver a restringirlas antes de seguir usando el proyecto.
