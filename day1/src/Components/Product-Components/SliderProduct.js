import React from 'react'
import "./SliderProduct.css";
import {Link} from 'react-router-dom';
const SliderProduct = (product) => {
  let p = product.product;  
  let overalltax = 10 / 100;
    let overallcomission = 10 / 100;
    let extraforfun = 10 / 100;
    
    let mrp = parseInt(product.product.price);
    mrp = Math.trunc(
      overalltax * mrp + overallcomission * mrp + extraforfun * mrp
    );
    const saleprice = mrp - extraforfun * mrp;
    return (
    <div className='mini-product-container'>
        <div className='mini-image-container'>
            <img src={product.product.productimage}/>
        </div>
        <p className='mini-product-details'>
            {product.product.producttitle}
        </p>
        <div className="mini-price-container">
          <p className="mrp">
            MRP: <p className="rate">Rs. {mrp}</p>
          </p>

          <p className="sales-price">
            Our Price: <p className="rate">Rs. {saleprice}</p>
          </p>

          <p className="yousave">You Save: Rs.{Math.trunc(mrp - saleprice)}</p>
        </div>
        <a href={`/product/${p.producttype}/${p.id}`}>
        <button className='show-more-btn'>Show More -&gt;</button>
        </a>
    </div>
  )
}

export default SliderProduct
