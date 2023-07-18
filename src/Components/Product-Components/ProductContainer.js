import React from "react";
import "./ProductContainer.css";
import { Link } from "react-router-dom";
const ProductContainer = (product) => {
  let p = product.product;
  let overalltax = 10 / 100;
  let overallcomission = 10 / 100;
  let extraforfun = 10 / 100;
  
  let mrp = parseInt(p.price);
  mrp = Math.trunc(
    overalltax * mrp + overallcomission * mrp + extraforfun * mrp
  );
  const saleprice = mrp - extraforfun * mrp;
  return (
    <div className="product-container">
      <a href={`/product/${p.producttype}/${p.id}`}>
      <img src={p.productimage} />
      </a>
      <div className="product-details">
        <a className="producttitle" href={`/product/${p.producttype}/${p.id}`}>
        <p>{p.producttitle}</p>
        </a>
        <div className="price-container">
          <p className="mrp">
            MRP: <p className="rate">Rs. {mrp}</p>
          </p>

          <p className="sales-price">
            Our Price: <p className="rate">Rs. {saleprice}</p>
          </p>

          <p className="yousave">You Save: Rs.{Math.trunc(mrp - saleprice)}</p>
        </div>
        <a className='buy-cart' href= {`/product/${p.producttype}/${p.id}`}>
          <button className='btn'>More Details -&gt;</button>
        </a>
      </div>
    </div>
  );
};

export default ProductContainer;
