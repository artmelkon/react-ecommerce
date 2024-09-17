export const isInCart = (product, cartItems) => {
  const itemsInCart = cartItems.some(item => item.id === product.id);
  return itemsInCart;
}
