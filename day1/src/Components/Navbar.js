import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css';
import Cartlogo from './assets/cartlogo.png';
import Profilelogo from './assets/profilelogo.png';
import appLogo from './assets/Booklogo.png';
import { auth,db } from '../FirebaseConfig/FirebaseConfig';
import {collection,getDocs,query,where} from 'firebase/firestore';
import { useEffect,useState } from 'react';
const Navbar = () => {
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

  const navigate=useNavigate();
  const loggedUser=GetCurrentUser();
  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate('/login');
    })
  }
  return (
    <div className='navbar'>
      <div className='left-container'>
        <img src={appLogo}/>
      </div>
      <div className='right-container'>
        {!loggedUser && <nav>
          <Link to = '/'><button>Home</button></Link>
          <Link to = '/signup'><button>Register</button></Link>
          <Link to = '/login'><button>Login</button></Link>
          <div className='cart-btn'>
            <img src = {Cartlogo} alt ='no img'/>
            <span className='cart-icon-css'>0</span>
          </div>
          <Link to = '/userprofile'>
            <img src ={Profilelogo} className='profile-icon'/>
          </Link>

          </nav>}
          {loggedUser &&
          <nav>
            <Link to = '/'><button>Home</button></Link>
            <div className='cart-btn'>
              <img src = {Cartlogo} alt = 'no logo'/>
              <span className='cart-icon-css'>{loggedUser[0].cart}</span>
            </div>
            <Link to = '/userprofile'>
              <img src ={Profilelogo} className='profile-icon'/>
            </Link>
            <button className='logout-btn' onClick={handleLogout}>
              Logout
            </button>
          </nav>
          }
      </div>
        
    </div>
  )
}

export default Navbar
