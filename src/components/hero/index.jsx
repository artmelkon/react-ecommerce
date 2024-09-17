import React from 'react';
import './index.styles.scss'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const Hero = ({ history }) => {
  return (
    <section className='hero is-info is-large hero-image'>
      <div className='hero-body'>
        <div className="hero-title">
          <h1>
            Bags reimagined for modern life.
          </h1>
          <div className="shop-now-btn">
            <button className="button is-black" id='shop-now' onClick={() => history.push('/shop')}>SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default withRouter(Hero);
