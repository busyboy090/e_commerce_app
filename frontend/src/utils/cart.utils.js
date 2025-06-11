export const generateCart = (products, cartItems) => {
    // Join cartItems with product details
    const itemMap = new Map(cartItems.map((item) => [item.productId, item]));

    const cart = products
        .map((product) => {
        const item = itemMap.get(product.product_id);
        if (!item) return null;

        const price = Number(product?.product_variants?.[0]?.price || 0);
        const subtotal = (price * item.quantity).toFixed(2);

        return {
            productId: item.productId,
            name: product.name,
            quantity: item.quantity,
            price,
            image: product?.product_colors?.[0]?.image || '',
            subtotal,
        };
        })
        .filter(Boolean);

        return cart
}