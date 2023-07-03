import {BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PgFOF from './Components/pgFOF';
import Cart from './Components/Cart';
import UserProfile from './Components/UserProfile';
import AddProduct from './Components/AddProduct';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/userprofile' element={<UserProfile/>}/>
        <Route exact path='/sellproduct' element={<AddProduct/>}/>
        <Route path='*' element={<PgFOF />}/>
      </Routes>
    </BrowserRouter>
  );
}
/*<Route path='*' element={<PgFOF />}/> should be mandatory and at last .if any wrong url is given it will give 
display error page*/

export default App;
