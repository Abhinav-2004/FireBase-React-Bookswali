import './UserProfile.css';
import React from 'react'
import Navbar from './Navbar'
import { auth, db } from "../FirebaseConfig/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
const UserProfile = () => {
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
  const loggedUser = GetCurrentUser();
  if(loggedUser){console.log(loggedUser[0].email)}
  return (
    <div>
        <Navbar/>
        <div className='userprofile-outer-container'>
          {loggedUser?
          <>
          <div className='user-profile'>
            <h1>Your Account Details</h1>
            <div className='data-row'>
              <span className='data-name'>Your Name - </span>  
              <span className='data-returned'>{loggedUser[0].username}</span>
            </div>
            <div className='data-row'>
              <span className='data-name'>Your Mobile - </span>  
              <span className='data-returned'>{loggedUser[0].phonenumber}</span>
            </div>
            <div className='data-row'>
              <span className='data-name'>Your Email - </span>  
              <span className='data-returned'>{loggedUser[0].email}</span>
            </div>
            <div className='data-row'>
              <span className='data-name'>Your Address - </span>  
              <span className='data-returned'>{loggedUser[0].address}</span>
            </div>
          </div>
          </>
            :<>
            <div className='not-logged-in'>
              You are not logged in.
              <Link to = '/login' className='click-here-to-login'>
                Click here to Login
              </Link>
            </div>
            </>}
          
        </div>
    </div>
  )
}

export default UserProfile
