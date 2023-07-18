import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import {auth,db} from '../FirebaseConfig/FirebaseConfig';
import { collection,getDocs, query, where } from 'firebase/firestore';
import CartCard from './CartCard';
import "./Cart.css";
const Cart = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            //console.log(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggedUser=GetCurrentUser();
  const [cartdata, setCartdata] = useState([]);
  if(loggedUser){
    const getcartdata=async()=>{
      const cartArray=[];
      const path=`cart-${loggedUser[0].uid}`;
      getDocs(collection(db, path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartArray.push({...doc.data(), id:doc.id})
        });
        setCartdata(cartArray);
        //console.log(cartArray);
      }).catch("Error Error Error");
    }
    getcartdata()
  }

  return (
    <div>
        <Navbar/>
        {cartdata.length!=0?
        <div>
          <div className='cart-head'>Your Cart Items</div>
          <div className='allcartitems'>
            {cartdata.map((item)=>{
              return(
                <CartCard key={item.id} itemdata={item}
                userid={loggedUser[0].uid}/>
              )
              
            })}
          </div>
          <div className='proceed'> 
            <button>Proceed</button>
          </div>
        </div>:
        <p className='empty-cart'>Your Cart is Empty</p>}
    </div>
  )
}

export default Cart
