import React, { createContext, useReducer } from 'react';
import cartReducer from './cart-reducer';

export const CartContext = createContext();

const initialStatae = { cartItems: [], itemCount: 0, tital: 0 };

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialStatae);
  const addProduct = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const increase = (product) => dispatch({ type: 'INCREASE', payload: product })

  const contextValues = {
    ...state,
    addProduct,
    increase
  }

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>
}

export default CartContextProvider;
