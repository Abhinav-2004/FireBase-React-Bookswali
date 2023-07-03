import React from 'react'
import Navbar from './Navbar'
import {useNavigate,Link} from 'react-router-dom';
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
const Login = () => {
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const navigate=useNavigate()
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const auth=getAuth();
    const handleLogin=(e)=>{
      e.preventDefault();
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredentials)=>{
        setSuccessMsg("You have been Logged In Successfully")
        setEmail('')
        setPassword('')
        setErrorMsg('')
        setTimeout(()=>{
            setSuccessMsg('');
            navigate('/home');
        },3000);
     })
     .catch((error)=>{
      if(error.message ==='Firebase: Error (auth/invalid-email).'){
          setErrorMsg("Please fill all the required fields correctly");
      }
      if(error.message ==='Firebase: Error (auth/user-not-found).'){
        setErrorMsg("Email not found !");
    }
      if(error.message ==='Firebase: Error (auth/wrong-password).'){
          setErrorMsg("Incorrect password");
      }
   });
    }
  return (
    <div>
      <Navbar/>
      <div className='login-container'>
        <form className='login-form'>
            <p>Login</p>
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
            <label>Your Email</label>
            <input
            onChange={(e)=>setEmail(e.target.value)}
             type ="email" placeholder = ''/>
            <label>Your Password</label>
            <input
            onChange={(e)=>setPassword(e.target.value)}
             type ="text" placeholder = ''/>
             <button type = 'submit' onClick={handleLogin}>Login</button>
        
        <div className='already-account'>
                <span>Don't have an account?</span>
                <Link className='login-here'to = '/signup'>Sign up </Link>
            </div>
            </form>
      </div>
    </div>
  )
}

export default Login
