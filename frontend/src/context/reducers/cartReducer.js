const initialState = {
  items: [],
};

const cartItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.items.find(
        (item) => item.productIdentifier === action.payload.productIdentifier
      );

      if (existingProduct) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.productIdentifier === action.payload.productIdentifier) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              };
            } else {
              return item;
            }
          }),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case 'REMOVE_FROM_CART':
      const { productIdentifier } = action.payload;
      console.log('Removing item from cart. Product Identifier:', productIdentifier);
      return {
        ...state,
        items: state.items.filter((item) => item.productIdentifier !== productIdentifier),
      };
    // FIXME: Not working properly setup the product identifier when incrementing the item from the cart
    // INCREASE_QUANTITY
    case 'INCREASE_QUANTITY':
      const incId = action.payload.productIdentifier;
      console.log('Product Identifier increase cart reducer', incId);
      return {
        ...state,
        items: state.items.map((item) =>
          item.productIdentifier === incId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    // REDUCE_QUANTITY
    case 'REDUCE_QUANTITY':
      const redId = action.payload.productIdentifier;
      console.log('Product Identifier reduce cart reducer', redId);
      return {
        ...state,
        items: state.items.map((item) =>
          item.productIdentifier === redId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };


    default:
      return state;
  }
};

export default cartItemReducer;
