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
                quantity: item.quantity + 1,
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

    // TODO: If the item is the same but different options do not remove all items
    case 'REMOVE_FROM_CART':
      // Remove the product from the cart
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'INCREASE_QUANTITY':
      // Increase the quantity of the specified product
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case 'REDUCE_QUANTITY':
      // Reduce the quantity of the specified product, removing if it becomes zero
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartItemReducer;
