// Estos valores viajan dentro del cliente a propósito: es como Firebase
// espera que se usen desde una app móvil/web, no son secretos por sí
// mismos. Lo que protege los datos son las reglas de la Realtime
// Database (configuradas en la consola de Firebase), no esconder esto.
export const base_url = "https://dragon-store-650f3-default-rtdb.firebaseio.com/"

// Base real de la API REST de Identity Toolkit (login/registro). Ojo:
// no confundir con la URL de "$discovery", que solo sirve para pedirle
// a Google la descripción de la API, no para llamarla.
export const base_auth_url = "https://identitytoolkit.googleapis.com/v1/"

export const api_key = "AIzaSyAL34teVjD1tCixIhphzdmAYeEDH_Rb55s"
