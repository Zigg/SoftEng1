const initialState = {
  products: [],
  product: {},
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "UPDATE_PRODUCT":
      const updatedProduct = action.payload;
      const updatedProducts = state.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      return {
        ...state,
        products: updatedProducts,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "PRODUCT_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
