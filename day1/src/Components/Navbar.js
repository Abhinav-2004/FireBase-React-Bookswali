import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css';
import Cartlogo from './assets/cartlogo.png';
import Profilelogo from './assets/profilelogo.png';
import appLogo from './assets/Booklogo.png';
import { auth,db } from '../FirebaseConfig/FirebaseConfig';
import {QuerySnapshot, collection,getDocs,query,where} from 'firebase/firestore';
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

  const [cartdata,setCartdata] = useState([]);
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
      <div className='navbar'>
      <Link to='/home'>
      <div className='left-container'>
        <img src={appLogo}/>
      </div>
      </Link>
      
      <div className='right-container'>
        {!loggedUser && <nav>
          <Link to = '/'><button>Home</button></Link>
          <Link to = '/signup'><button>Register</button></Link>
          <Link to = '/login'><button>Login</button></Link>
          <div className='cart-btn'>
            <Link to="/cartdata">
            <img src = {Cartlogo} alt ='no img'/></Link>
              <button className='cart-icon-css'>
              0
            </button>
            
          </div>
          <Link to = '/userprofile'>
            <img src ={Profilelogo} className='profile-icon'/>
          </Link>

          </nav>}
          {loggedUser &&
          <nav>
            <Link to = '/'><button>Home</button></Link>
            <Link to = '/sellproduct'><button>Sell</button></Link>

            <Link to ='/cart'>
            <div className='cart-btn'>
              <img src = {Cartlogo} alt = 'no logo'/>
              <span className='cart-icon-css'>{cartdata.length}</span>
            </div>
            </Link>
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
    <div className='product-types'>
      <a href='/product-type/mobiles'><button>Mobiles</button></a>
      <a href ='/product-type/appliances'><button>Appliances</button></a>
      <a href='/product-type/clothes'><button>Clothes</button></a>
      <a href='/product-type/shoes'><button>Shoes</button></a>
    </div>
    </div>
  )
}

export default Navbar
