import React from 'react'
import { withRouter } from 'react-router-dom';

const Total = ({ itemCount, total, clearCart, history }) => {
  return (
    <div className='tital-contaienr'>
      <div className='total'>
        <p>Total Items: {itemCount}</p>
        <p>{`Total: $${total}`}</p>
      </div>
      <div className='checkout'>
        <button className='button is-black' onClick={() => history.push('/checkout')}>CHECKOUT</button>
        <button className='button is-white' onClick={() => clearCart()}>CLEAR</button>
      </div>
    </div>
  )
}

export default withRouter(Total)
