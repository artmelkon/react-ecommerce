import React, { Fragment, useContext } from 'react';
import { CartContext } from '../../../context/cart-context';
import Layout from '../../shared/layout';
import CartItem from './cart-item';
import './index.styles.scss';

const CartPage = () => {
  const { cartItems, itemCount, total } = useContext(CartContext);

  return <Layout>
    <Fragment>
      <h1>Cart</h1>
      {
        cartItems.length === 0 ?
          <div className='emtpy-cart'>Your Cart is Empty</div> :
          <Fragment>
            <div className='cart-page'>
              <div className='cart-item-container'>
                {cartItems.map(item => <CartItem {...item} key={item.id} />)}
              </div>
            </div>
          </Fragment>
      }
    </Fragment>
  </Layout>
}

export default CartPage
