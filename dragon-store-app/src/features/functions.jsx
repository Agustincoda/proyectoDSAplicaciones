export const calculate_total_price = (items) =>{
    return items.reduce((acc, item)=>(acc+=item.price*item.quantity),0)
}

// Los precios en Firebase vienen como texto con signo de pesos, ej.
// "$20000" — hay que limpiar todo lo que no sea dígito/punto/guión
// antes de poder operar con ellos como número.
export const parse_price = (price) => {
    if (typeof price === 'number') return price
    return Number(String(price).replace(/[^0-9.-]+/g, '')) || 0
}

// Los productos de Firebase usan nombres de campo en español
// (nombre, Imagen, Descripcion, Precio) pero las pantallas del carrito
// están escritas en inglés (title, mainImage, price numérico). Esta es
// la única función que debería traducir de un esquema al otro — así
// evitamos que cada pantalla tenga que saber ambos formatos.
export const product_to_cart_item = (product, quantity = 1) => ({
    id: product.id,
    title: product.nombre,
    shortDescription: product.Descripcion,
    mainImage: product.Imagen,
    price: parse_price(product.Precio),
    quantity
})