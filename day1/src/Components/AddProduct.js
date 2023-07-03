import React from 'react';
import './AddProduct.css';
import Navbar from './Navbar';
import { storage,auth, db } from "../FirebaseConfig/FirebaseConfig";
import { collection, getDocs, addDoc,query, where } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage';
const AddProduct = () => {
    const[producttitle, setProducttitle]=useState('');
    const[producttype, setProducttype]=useState('');
    const[description, setDescription]=useState('');
    const[brand, setBrand]=useState('');
    const[customersupport, setCustomersupport]=useState('');
    const[price, setPrice]=useState('');
    const[warranty, setWarranty]=useState('');
    const[productimage, setProductimage]=useState('');
    
    const[imageError, setImageError]=useState('');
    const[successMsg, setSuccessMsg]=useState('');
    const[uploadError, setUploadError]=useState('');

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
      //if(loggedUser){console.log(loggedUser[0].email)}
      const types = ['image/jpg','image/jpeg','image/png', 'image/PNG'];
      const handleProductImage=(e)=>{
        e.preventDefault();
        let selectetFile=e.target.files[0];
        if(selectetFile){
            if(selectetFile && types.includes(selectetFile.type)){
                setProductimage(selectetFile);
                setImageError('');
            }
            else{
                setProductimage('');
                setImageError('File Type not supported. Only JPG/PNG supported');
            }
        }
        else{
            setImageError("Please select your image");
        }
      }
    const handleAddproduct=(e)=>{
        e.preventDefault();
        const storageRef=ref(storage,`product-images${producttype.toUpperCase()}/${Date.now()}`);
        //console.log(storageRef._location.path);
        uploadBytes(storageRef,productimage).then(()=>{
            getDownloadURL(storageRef).then(url=>{
                addDoc(collection(db,`products-${producttype.toUpperCase()}`),{
                producttitle,
                producttype,
                description,
                brand,
                customersupport,
                price,
                warranty,
                productimage:url
                })
            })
        })
    }
    return (
    <div>
      <Navbar/>
        {loggedUser && loggedUser[0].email==="kittusinghranchi@gmail.com"?
        <div className='background'>
        <div className='add-product-container'>
            <form className='add-product-form' onSubmit={handleAddproduct}>
                <h1>Add Product Details</h1>
                {successMsg &&
                <div className='success-msg'>
                    {successMsg}
                </div>}
                {uploadError &&
                <div className='error-msg'>
                    {uploadError}
                </div>}
                <label>Product Title</label>
                <input type= "text"
                onChange={(e)=>{setProducttitle(e.target.value)}}/>
                <label>Product Type</label>
                <input type= "text"
                onChange={(e)=>{setProducttype(e.target.value)}}/>
                <label>Brand Name</label>
                <input type= "text"
                onChange={(e)=>{setBrand(e.target.value)}}/>
                <label>Warranty</label>
                <input type= "text"
                onChange={(e)=>{setWarranty(e.target.value)}}/>
                
                <label>Image</label>
                <input type= "file"
                onChange={handleProductImage}/>
                {imageError &&
                <div className='error-msg'>
                    {imageError}
                </div>}
                <label>Description</label>
                <input type= "text"
                onChange={(e)=>{setDescription(e.target.value)}}/>
                <label>Price without tax</label>
                <input type= "text"
                onChange={(e)=>{setPrice(e.target.value)}}/>
                <label>Customer Support Number</label>
                <input type= "text"
                onChange={(e)=>{setCustomersupport(e.target.value)}}/>
                <button type = 'submit'>ADD</button>
            </form>

        </div>
        </div>
        :<div>
            <h1 className='not-approved'>
                You are not approved to become a seller!
            </h1>
        </div>}
    </div>
  )
}

export default AddProduct
