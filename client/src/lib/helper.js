import { auth } from "../firebase/config";

export const isInCart = (product, cartItems) => {
  const itemsInCart = cartItems.some(item => item.id === product.id);
  return itemsInCart;
}

const url = process.env.REACT_APP_SERVER_URI;

export async function fetchFormAPI(endpoint, opts) {
  const { method, body } = {
    method: 'POST',
    body: null,
    ...opts,
  }
  try {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const res = await fetch(`${url}/api/${endpoint}`, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Something went wrong');
    const response = await res.json()
    console.log('response: ', response)
    return response;
  } catch (error) {
    console.log('error: ', error);
    throw new Error(error)
  }

}
