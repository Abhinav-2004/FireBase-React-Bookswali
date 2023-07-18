import {BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PgFOF from './Components/pgFOF';
import Cart from './Components/Cart';
import UserProfile from './Components/UserProfile';
import AddProduct from './Components/AddProduct';
import AllProduct from './Components/Product-Components/AllProduct';
import SpecificProductPage from './Components/Product-Components/SpecificProductPage';
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
        <Route exact path='/product-type/mobiles' element={<AllProduct type={'Mobiles'}/>}/>
        <Route exact path='/product-type/appliances' element={<AllProduct type={'Appliances'}/>}/>
        <Route exact path='/product-type/clothes' element={<AllProduct type={'Clothes'}/>}/>
        <Route exact path='/product-type/shoes' element={<AllProduct type={'Shoes'}/>}/>

        <Route path='/product/:type/:id/' element={<SpecificProductPage/>}/>
        <Route path='*' element={<PgFOF />}/>
      </Routes>
    </BrowserRouter>
  );
}
/*<Route path='*' element={<PgFOF />}/> should be mandatory and at last .if any wrong url is given it will give 
display error page*/

export default App;
