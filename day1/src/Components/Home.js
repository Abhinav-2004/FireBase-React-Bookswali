import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Banner from "./Banner";
import { auth, db } from "../FirebaseConfig/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
const Home = () => {
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
      <Products />
      <p>{loggedUser?loggedUser[0].email:"User not found"}</p>
    </div>
  );
};

export default Home;
