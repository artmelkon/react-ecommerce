const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const sumItems = cartItems => {
  storeCartItems(cartItems)

  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: cartItems.reduce((total, prod) => total + (prod.price * prod.quantity), 0)
  }
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // check if item is in the cart
      if (!state.cartItems.find(item => item.id === action.payload.id)) { state.cartItems.push({ ...action.payload, quantity: 1 }) }
      return { ...state, cartItems: [...state.cartItems], ...sumItems(state.cartItems) };
    case 'INCREASE':
      // if item already in the care increment quantity
      const increaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      state.cartItems[increaseIndex].quantity++;
      return { ...state, cartItems: [...state.cartItems], ...sumItems(state.cartItems) };
    case 'DECREASE':
      // reduce count of existing product
      const decreaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (state.cartItems[decreaseIndex].quantity > 1) state.cartItems[decreaseIndex].quantity--;
      return { ...state, cartItems: [...state.cartItems], ...sumItems(state.cartItems) };
    case 'REMOVE_ITEM':
      const filteredCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      return { ...state, cartItems: [...filteredCartItems], ...sumItems(filteredCartItems) };
    case 'CLEAR':
      localStorage.removeItem('cart')
      return { cartItems: [], itemCount: 0, total: 0 }
    default:
      return state;
  }
}

export default cartReducer;
