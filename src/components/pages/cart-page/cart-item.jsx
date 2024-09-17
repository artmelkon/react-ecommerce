import React from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../../icons'

const CartItem = ({ id, title, price, quantity, imageUrl }) => {

  return (
    <div>
      <div>
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
        <button>
          <PlusCircleIcon with="20px" />
        </button>
        <button>
          {quantity === 1 ? <TrashIcon with='20px' /> : <MinusCircleIcon with='20px' />}
        </button>

      </div>
    </div>
  )
}

export default CartItem;
