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
const productsArray = [];
  useEffect(() => {
    const getProducts=()=>{
    
    const path = `products-${props.type.toUpperCase()}`
      getDocs(collection(db, path))
        .then((querySnapshot)=>{
          querySnapshot.forEach((doc) => {
            productsArray.push({...doc.data(), id:doc.id });
          })
          //console.log(productsArray);
          //setProducts(productsArray);
          setProducts(productsArray);
          //console.log('done');
          //console.log(products_var);
          
        }).catch((error) => {
          console.log(error.message);
        });
    }
    getProducts()
    
  }, []);
  console.log(products);
  return (
    <div>
      <Navbar />
      <div className="heading">
        <p>Top Results for {props.type}</p>
      </div>

      <div className="allproductcontainer">
        
        {products.map((element)=>{
            return(
          <ProductContainer
            key={element.id}
            product={element}
          />
          );
        })}
      </div>
    </div>
  );
};

export default AllProduct;
