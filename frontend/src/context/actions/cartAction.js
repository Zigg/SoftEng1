export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});

export const increaseQuantity = (productId) => ({
  type: 'INCREASE_QUANTITY',
  payload: productId,
});

export const reduceQuantity = (productId) => ({
  type: 'REDUCE_QUANTITY',
  payload: productId,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const setCartItems = (items) => ({
  type: 'SET_CART_ITEMS',
  payload: items,
});

export const getCartItems = () => ({
  type: 'GET_CART_ITEMS',
});
