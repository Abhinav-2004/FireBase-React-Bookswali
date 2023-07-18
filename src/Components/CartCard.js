import React from "react";
import "./CartCard.css";
import { useState } from "react";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";
const CartCard = (props) => {
  //console.log(itemdata);
  const [productquantity, setProductquantity] = useState(
    props.itemdata.quantity
  );

  let p = props.itemdata.product.price;
  let overalltax = 10 / 100;
  let overallcomission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(p);
  mrp = Math.trunc(
    overalltax * mrp + overallcomission * mrp + extraforfun * mrp
  );
  const saleprice = Math.trunc((mrp - extraforfun * mrp) * productquantity);

  const increasequantity = async () => {
    setProductquantity(productquantity + 1);
    const itemRef = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`);
    await updateDoc(itemRef, {
      quantity: productquantity + 1,
    }).then(() => {
      //console.log("increased");
    });
  };
  const decreasequantity = async () => {
    if (productquantity >= 1) {
      setProductquantity(productquantity - 1);
      const itemRef = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`);
      await updateDoc(itemRef, {
        quantity: productquantity - 1,
      }).then(() => {
        //console.log("Decreased");
      });
    }
  };
  const deletecartitem = async () => {
    await deleteDoc(
      doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
    ).then(() => {
      //console.log("document deleted");
    });
  };
  return (
    <div className="cart-product-container">
      <div className="cart-prod-imgtitle">
        <div className="prod-image">
          <img src={props.itemdata.product.productimage} />
        </div>
        <div className="prod-title">{props.itemdata.product.producttitle}</div>
      </div>
      <div className="prodquantity-div">
        <button onClick={increasequantity}>+</button>
        <p>{productquantity}</p>
        <button onClick={decreasequantity}>-</button>
      </div>
      <div className="prodprice">Rs.{saleprice}</div>
      <button className="deletebtn" onClick={deletecartitem}>
        <img src="https://cdn-icons-png.flaticon.com/512/216/216658.png?w=740&t=st=1689670668~exp=1689671268~hmac=df973a0764eaa8bd55864eec88242610be7a9c699a9b7efbfc3765752abd1815" />
      </button>
    </div>
  );
};

export default CartCard;
