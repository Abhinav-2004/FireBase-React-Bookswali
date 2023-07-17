import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';
import {auth,db} from '../FirebaseConfig/FirebaseConfig';
import { collection,getDocs, query, where } from 'firebase/firestore';
import CardCard from './CartCard';
import "./Cart.css";
const Cart = () => {
  return (
    <div>
        <Navbar/>
      
    </div>
  )
}

export default Cart
