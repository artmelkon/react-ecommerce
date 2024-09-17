export const sumitems = cartItems => {
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
      return { ...state, cartItems: [...state.cartItems], ...sumitems(state.cartItems) };
    case 'INCREASE':
      // if item already in the care increment quantity
      const increaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      state.cartItems[increaseIndex].quantity++;
      return {...state, cartItems: [...state.cartItems], ...sumitems(state.cartItems)}
    default:
      return state;
  }
}

export default cartReducer;
