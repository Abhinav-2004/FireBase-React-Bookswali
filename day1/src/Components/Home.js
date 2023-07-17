import React , {useState, useEffect,props} from 'react';
import "./Home.css";
import Navbar from './Navbar';
import Banner from "./Banner";
import {auth,db} from "../FirebaseConfig/FirebaseConfig";
import {collection,getDocs,query,where} from 'firebase/firestore';
import ProductSlider from './Product-Components/ProductSlider';

const Home = () => {
 /* const [products, setProducts] =  useState([]);
    const productsArray = [];
    useEffect(() => {
    const getProducts=()=>{
    
    const path = `products-${props.type.toUpperCase()}`
      getDocs(collection(db, path))
        .then((querySnapshot)=>{
          querySnapshot.forEach((doc) => {
            productsArray.push({...doc.data(), id:doc.id });
          })
          //console.log(productsArray);
          //setProducts(productsArray);
          setProducts(productsArray);
          //console.log('done');
          //console.log(products_var);
          return productsArray;
        }).catch((error) => {
          console.log(error.message);
        });
    }
    const Array = getProducts();
    
  }, []);
  console.log(products);
  */
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
      <Navbar />
      <Banner />
      <div className='slider-head'>
        Limited Time Deals
      </div>
      <ProductSlider type={'Mobiles'} />
      <ProductSlider type={'Appliances'} />
      <ProductSlider type={'Clothes'} />
      <ProductSlider type={'Shoes'} />
    </div>
  );
};

export default Home;
