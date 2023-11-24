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
                // quantity: item.quantity + 1,
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

    // FIXME: Not working
    case 'REMOVE_FROM_CART':
      const { id, options } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => {
          if (item.productIdentifier === id) {
            const sizeMatch = item.options.size === options.size;
            const addonsMatch = item.options.addons === options.addons;

            return !(sizeMatch && addonsMatch);
          } else {
            return true;
          }
        }),
      };

    // FIXME: Not working
    case 'INCREASE_QUANTITY':
      const incId = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.productIdentifier === incId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }

    // FIXME: Not working

    case 'REDUCE_QUANTITY':
      const redId = action.payload;
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
