import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions";
import Layout from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

/**
 * @author
 * @function ProductList
 **/

const ProductList = (props) => {
  // ! State
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under25k: 25000,
    under30k: 30000,
  });

  // ! Extract category data from store
  const product = useSelector((state) => state.product);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  // ! render product list
  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => { // search for product key under productsByPrice object ank get in key
        return (
          <div className="card">
            <div className="cardHeader">
              <div>
                {props.match.params.slug} mobile under {priceRange[key]}
              </div>
              <button>view all</button>
            </div>

            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => ( // Use key to find product
                <div className="productContainer">
                  <div className="productImageContainer">
                    <img
                      src={generatePublicUrl(product.productPhotos[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3356</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default ProductList;
