let wishList = JSON.parse(localStorage.getItem('wishList')) || [];

const saveToStorage =  () => {
    localStorage.setItem('wishList', JSON.stringify(wishList));
}

export const addToWishList = (productId) => {
    wishList.push({
        productId
    })

    saveToStorage()
}

export const removeFromWishList = (productId) => {
    wishList = wishList.filter((product) => product.productId !== productId);

    saveToStorage();
}

export const productExist = (productId) => {
    const matchingProduct = wishList.find((product) => product.productId == productId)

    return matchingProduct;
}

export const getWishListProductIds = () => {
    const productIds = wishList.map((product) => product.productId)
    return productIds;
}

export const numberOfProduct = () => {
    return wishList.length
}