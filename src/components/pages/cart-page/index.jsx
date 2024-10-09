import React, { Fragment, useContext } from 'react';
import { CartContext } from '../../../context/cart-context';
import Layout from '../../shared/layout';
import CartItem from './cart-item';
import Total from './total';
import './index.styles.scss';

const CartPage = () => {
  const { cartItems, itemCount, total, clearCart, increase, decrease, removeProduct } = useContext(CartContext);
  const funcs = {increase, decrease, removeProduct};

  return <Layout>
    <Fragment>
      <h1>Cart</h1>
      {
        cartItems.length === 0 ?
          <div className='empty-cart'>Your Cart is Empty</div> :
          <Fragment>
            <div className='cart-page'>
              <div className='cart-item-container'>
                {cartItems.map(item => <CartItem {...item} key={item.id} {...funcs} />)}
              </div>
              <Total itmeCount={itemCount} total={total} clearCart={clearCart} />
            </div>
          </Fragment>
      }
    </Fragment>
  </Layout>
}

export default CartPage
