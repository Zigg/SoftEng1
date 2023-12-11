export const getProducts = (products) => ({
  type: 'GET_PRODUCTS',
  payload: products,
});

export const getProduct = (product) => ({
  type: 'GET_PRODUCT',
  payload: product,
});

export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  payload: product,
});

export const updateProduct = (product) => ({
  type: 'UPDATE_PRODUCT',
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: 'DELETE_PRODUCT',
  payload: productId,
});

export const productError = (error) => ({
  type: 'PRODUCT_ERROR',
  payload: error,
});


// export const getProductsAsync = () => async (dispatch) => {
//   try {
//     const products = await getProductsList();
//     dispatch(getProducts(products));
//   } catch (error) {
//     dispatch(productError(error.message));
//   }
// }

// export const getProductAsync = (productId) => async (dispatch) => {
//   try {
//     const product = await getProductDetails(productId);
//     dispatch(getProduct(product));
//   } catch (error) {
//     dispatch(productError(error.message));
//   }
// }





