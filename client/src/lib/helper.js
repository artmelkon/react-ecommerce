export const isInCart = (product, cartItems) => {
  const itemsInCart = cartItems.some(item => item.id === product.id);
  return itemsInCart;
}

export async function fetchFormAPI(endpoint, opts) {
  const { method, body } = {
    method: 'POST',
    body: null,
    ...opts,
  }

  const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error('Something went wrong');
  const response = await res.json()
  console.log('response: ', response)
  return response;
}
