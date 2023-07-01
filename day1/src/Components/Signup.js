import React from 'react'
import Navbar from './Navbar'
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth,db} from '../FirebaseConfig/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import "./Signup.css"
const Signup = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [phonenumber,setPhonenumber]=useState('');
    const [address,setAddress]=useState('');
    const navigate=useNavigate()
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
            const user = userCredentials.user;
            const initialcartvalue=0;
            console.log(user);
            //addDoc will add to collections type,db is database and users will be its name, its schema is defined below
            addDoc(collection(db,"users"), {
                username:username,
                email:email,
                phonenumber:phonenumber,
                password:password,
                cart:initialcartvalue,
                address:address,
                uid:user.uid//user.uid is unique id for every user created ,its default of firebase so we will use it to search users and data
             }).then(()=>{
                setSuccessMsg("You have been registered Successfully, You will be redirected to the Login page now !")
                setUsername('')
                setPhonenumber('')
                setEmail('')
                setPassword('')
                setErrorMsg('')
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login');
                },4000);
             })

        }).catch((error)=>{
            if(error.message ==='Firebase: Error (auth/invalid-email).'){
                setErrorMsg("Please fill all the required fields correctly");
            }
            if(error.message ==='Firebase: Error (auth/email-already-in-use).'){
                setErrorMsg("Already Registered");
            }
         });
    }

    return (
    <div>
      <Navbar/>
      <div className='signup-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
            <p>Create Account Here !</p>
            {successMsg &&<>
            <div className='success-msg'>
                {successMsg}
            </div>
            </>}
            {errorMsg && <>
            <div className='error-msg'>
                    {errorMsg}
            </div>
            </>}
            <label>Your Name</label>
            <input
            onChange={(e)=>setUsername(e.target.value)}
             type ="text" placeholder = ''/>
            <label>Your Email</label>
            <input
            onChange={(e)=>setEmail(e.target.value)}
             type ="email" placeholder = ''/>
             <label>Your Phone Number</label>
            <input
            onChange={(e)=>setPhonenumber(e.target.value)}
             type ="text" placeholder = ''/>
            <label>Your Password</label>
            <input
            onChange={(e)=>setPassword(e.target.value)}
             type ="text" placeholder = ''/>
             <label>Your Address</label>
            <textarea
            onChange={(e)=>setAddress(e.target.value)}
             type ="text" placeholder = ''/>
             <button type = 'submit'>Sign Up</button>
             <div className='already-account'>
                <span>Already have an account?</span>
                <Link className='login-here'to = '/login'>Login here</Link>
             </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
