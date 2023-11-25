export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const removeFromCart = (product) => ({
  type: 'REMOVE_FROM_CART',
  payload: product,
});


export const increaseQuantity = (product) => ({
  type: 'INCREASE_QUANTITY',
  payload: product,
});

export const reduceQuantity = (product) => ({
  type: 'REDUCE_QUANTITY',
  payload: product,
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
