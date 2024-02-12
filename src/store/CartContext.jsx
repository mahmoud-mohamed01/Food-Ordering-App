import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const ADD_ITEM = "ADDITEM";
const REMOVE_ITEM = "removeItem";

function cartReducer(state, action) {
  if (action.type == ADD_ITEM) {
    let existItemIdx = state.items.findIndex((item) => {
      return item.id == action.item.id;
    });

    const updatedItems = [...state.items];

    if (existItemIdx > -1) {
      let existingItem = state.items[existItemIdx];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existItemIdx] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  } else if (action.type == REMOVE_ITEM) {
    let existItemIdx = state.items.findIndex((item) => {
      return item.id == action.item.id;
    });

    let updatedItems = [...state.items];
    let item = updatedItems[existItemIdx];
    if (item.quantity == 1) {
      updatedItems.splice(existItemIdx, 1);
    } else {
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };
      updatedItems[existItemIdx] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: ADD_ITEM, item });
  }

  function removeItem(item) {
    dispatch({ type: REMOVE_ITEM, item });
  }

  let cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
