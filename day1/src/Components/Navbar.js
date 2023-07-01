import React from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css';
import Cartlogo from './assets/cartlogo.png';
import Profilelogo from './assets/profilelogo.png';
const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to = '/home'><button>Home</button> </Link>
        <Link to = '/signup'><button>Signup</button> </Link>
        <Link to = '/login'><button>Login</button> </Link>
        <Link to='/cart'>
        <div className='cart-btn'>
            <img src = {Cartlogo} alt =""/>
            <span className='cart-icon-css'>0</span>
        </div>
        </Link>
        <Link to = '/userprofile'>
        <img src = {Profilelogo} className='profile-icon' alt =""/>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar
