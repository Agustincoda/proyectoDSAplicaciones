export const calculate_total_price = (items) =>{
    return items.reduce((acc, item)=>(acc+=item.price*item.quantity),0)
}

export const parse_price = (price) => {
    if (typeof price === 'number') return price
    return Number(String(price).replace(/[^0-9.-]+/g, '')) || 0
}

export const product_to_cart_item = (product, quantity = 1) => ({
    id: product.id,
    title: product.nombre,
    shortDescription: product.Descripcion,
    mainImage: product.Imagen,
    price: parse_price(product.Precio),
    quantity
})