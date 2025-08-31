import React, { useContext } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { CartContext } from "../../context/cart-context";
import './index.styles.scss';

const CartIcon = ({ history }) => {
  const { itemCount, cartItems } = useContext(CartContext);
  const shoppingBag = "/assets/shopping-bag.png";

  return (
    <div className="cart-container" onClick={() => history.push('/cart')}>
      <img src={shoppingBag} alt="shopping cart icon" />
      {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
    </div>
  );
};

export default withRouter(CartIcon);
