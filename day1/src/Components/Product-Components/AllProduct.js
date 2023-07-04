import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../Navbar";
import "./AllProduct.css";
import ProductContainer from "./ProductContainer";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  getDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig/FirebaseConfig";
const AllProduct = (props) => {
  //console.log(props.type);
const [products, setProducts] =  useState([]);
  useEffect(() => {
    const getProducts=()=>{
    const productsArray = [];
    const path = `products-${props.type.toUpperCase()}`
      getDocs(collection(db, path))
        .then((querySnapshot)=>{
          querySnapshot.forEach((doc) => {
            productsArray.push({...doc.data(), id:doc.id });
          })
          console.log(productsArray);
          setProducts(productsArray);
          console.log('done');
          console.log(products);
          
        }).catch((error) => {
          console.log(error.message);
        });
    }
    getProducts()
    
  }, []);

  return (
    <div>
      <Navbar />
      <div className="heading">
        <p>Top Results for {props.type}</p>
      </div>

      <div className="allproductcontainer">
        {products.map((product)=>{
          <ProductContainer
            key={product.id}
            product={product}
          />
        })}
      </div>
    </div>
  );
};

export default AllProduct;
