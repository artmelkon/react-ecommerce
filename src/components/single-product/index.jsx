import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { CartContext } from '../../context/cart-context';
import { ProductsContext } from '../../context/products-context';
import { isInCart } from '../../lib/helper';
import Layout from '../shared/layout';
import './index.styles.scss';

const SingleProduct = ({ match, history }) => {
  const [product, setProduct] = useState(null);
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const { products } = useContext(ProductsContext);
  const { id } = match.params;

  useEffect(() => {
    const data = products.find((item) => Number(item.id) === Number(id));

    // if product doesn't exist, redirect to shop page
    if (!data) {
      return PushManager('/shop');
    }
    setProduct(data)
  }, [products, id])

  console.log('selected product: ', product)

  if (!product) return <p>Loading...!</p>;
  const { imageUrl, title, price, description } = product;

  return (
    <Layout>
      <div className='single-product-container'>
        <div className='product-image'>
          <img src={imageUrl} alt={title} />
        </div>
        <div className='product-details'>
          <div className='name-price'>
            <h3>
              {title}
            </h3>
            <p>${price}</p>
          </div>
          <div className='add-to-cart-btns'>
            {
              !isInCart(product, cartItems) ? <button className='button is-white nomad-btn' id='btn-white-outline' onClick={() => addProduct(product)}>ADD TO CART</button> : <button className='button is-white nomad-btn' id='btn-white-outline' onClick={() => increase(product)}>ADD MORE</button>
            }
            <button className='button is-black nomad-btn' id='btn-white-outline'>PROCEED TO CHECKOUT</button>
          </div>
          <div className='product-description'>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(SingleProduct)
