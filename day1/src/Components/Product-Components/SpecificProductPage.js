import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from "../Navbar";
import {auth,db} from '../../FirebaseConfig/FirebaseConfig';
import {doc,getDoc,collection,query,where,getDocs,addDoc} from 'firebase/firestore';
import './SpecificProductPage.css';
import ProductSlider from './ProductSlider';
import SliderProduct from './SliderProduct';

const SpecificProductPage = () => {
  const {type,id}=useParams();
  const [product, SetProduct]= useState('');
  const [successMsg, SetSuccessMsg]= useState('');
  const [errorMsg, SetErrorMsg]= useState('');
    function GetCurrentProduct(){
        useEffect(()=>{
            const getProduct=async ()=>{
                const docRef=doc(db, `products-${type.toUpperCase()}`, id);
                const docSnap=await getDoc(docRef);
                SetProduct(docSnap.data());
            };
            getProduct();
        }, [])
        //console.log(product);
        return product;
    }
    GetCurrentProduct();

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
      const loggedUser=GetCurrentUser();
      function addtocart(){
        if(loggedUser){
            addDoc(collection(db, `cart-${loggedUser[0].uid}`),{product, quantity:1}).then(()=>{
                SetSuccessMsg('Product Added to Cart');
            }).catch((error)=>{
                SetErrorMsg(error.message);
            })
        }
        else{
            SetErrorMsg('You need to Login First');
        }
      }
      
  let overalltax = 10 / 100;
    let overallcomission = 10 / 100;
    let extraforfun = 10 / 100;
    
    let mrp = parseInt(product.price);
    mrp = Math.trunc(
      overalltax * mrp + overallcomission * mrp + extraforfun * mrp
    );
    const saleprice = mrp - extraforfun * mrp;
    return (
    <div>
      <Navbar/>
      {product?<div className='myprod-container'>
        <div className='prod-img-cont'>
            <img src={product.productimage}/>
        </div>
        <div className='flex-cont'>
        <div className="prod-data">
            <p className='prod-head'>
                {product.producttitle}
            </p>
            <p className='prod-keyspecs'>
                {product.keyspecs}
            </p>
            <div className="specific-price-container">
          <p className="mrp">
            MRP: <p className="rate">Rs. {mrp}</p>
          </p>

          <p className="sales-price">
            Our Price: <p className="rate">Rs. {saleprice}</p>
          </p>

          <p className="yousave">You Save: Rs.{Math.trunc(mrp - saleprice)}</p>
        </div>           
        </div>
        <p className='prod-details-head'>
            Details
        </p>
        <p className='prod-description'>
            {product.description}
        </p>
        <div className='row-cont'>
            <div className='warranty-replacemnt'>
            <div className='cod'>
                <div className='img-circle'>
                    <img src='https://img.icons8.com/?size=512&id=nEQR7bS5lb7C&format=png'/>
                </div>
                <p>Cash on Delivery</p>
            </div>

            <div className='warranty'>
                <div className='img-circle'>
                    <img src='https://img.icons8.com/?size=512&id=r5lBdUMRGKc6&format=png'/>
                </div>
                <p>{product.warranty} Warranty</p>
            </div>

            <div className='replacement'>
                <div className='img-circle'>
                    <img src='https://img.icons8.com/?size=512&id=AUbFrJgJlyCU&format=png'/>
                </div>
                <p>Hassle-Free Replacement</p>
            </div>
            </div>
            <div className='buy-cart'>
                <button className='btn'>Buy Now</button>
                <button onClick={addtocart} className='btn'>
                    Add to Cart
                </button>
            </div>
        </div>
        </div>
        {successMsg && <>
            <div className='success-msg'>
                {successMsg}
            </div>
        </>}
        {errorMsg && <>
            <div className='error-msg'>
                {errorMsg}
            </div>
        </>}
        
      </div> 
      
      :<div>Loading...</div>
      }
      <p className='prod-details-head2'>Similar Items</p>
      <ProductSlider type={type}/>
    </div>
  )
}

export default SpecificProductPage;
