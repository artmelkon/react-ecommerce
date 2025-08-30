import React from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../icons';

const CartItem = ({ id, title, price, quantity, imageUrl, description, increase, decrease, removeProduct }) => {
  const product = { id, title, price, quantity, imageUrl, description }
  return (
    <div className='cart-item'>
      <div className='item-image'>
        <img src={imageUrl} alt={title} />
      </div>
      <div className='name-price'>
        <h4>{title}</h4>
        <p>${price}</p>
      </div>
      <div className='quantity'>
        <p>Quantity: {quantity}</p>
      </div>
      <div>
        <button className='btn-increase' onClick={() => increase(product)}>
          <PlusCircleIcon width="20px" />
        </button>
        {quantity === 1 ? (<button className='btn-trush' onClick={() => removeProduct(product)}>
          <TrashIcon className='btn-trash' width='20px' />
        </button>) : (<button className='btn-decrease' onClick={() => decrease(product)}>
          <MinusCircleIcon className='btn-decrease' width='20px' />
        </button>)}

      </div>
    </div>
  )
}

export default CartItem;
