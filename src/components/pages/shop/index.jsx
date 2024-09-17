import React, { useContext } from 'react';
import _ from 'lodash';
import Layout from '../../shared/layout';
import FeatureProducts from '../../shared/featured-product';
import { ProductsContext } from '../../../context/products-context';
import './index.styles.scss';

const Shop = () => {
  const {products} = useContext(ProductsContext);
  const allProducts = _.map(products, (product) => (<FeatureProducts key={product.id} {...product} />))
  return (
    <Layout>
      <div className='product-list-container'>
        <h2 className='product-list-title'>Shop</h2>
        <div className='product-list'>
          {allProducts}
        </div>
      </div>
    </Layout>
  )
}
export default Shop
