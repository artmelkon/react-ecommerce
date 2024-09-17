import React, { useContext } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { CartContext } from "../../context/cart-context";
import { isInCart } from "../../lib/helper";
import './featured-product.styles.scss';

const FeaturedProduct = ({ id, title, price, imageUrl, history, description }) => {
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const product = { id, title, price, imageUrl, description };

  return <div className="featured-product">
    <div className="featured-image" onClick={() => history.push(`/product/${id}`)}>
      <img src={imageUrl} alt="product" />
    </div>
    <div className="name-price">
      <h3>{title}</h3>
      <p>${price}</p>
      {
        !isInCart(product, cartItems) ? <button className="button is-black nomad-btn" onClick={(() => addProduct(product))} id="btn-white-outline">ADD TO CART</button> : <button className="button is-white nomad-btn" onClick={() => increase(product)}>ADD MORE</button>
      }
    </div>
  </div>
}

export default withRouter(FeaturedProduct);
