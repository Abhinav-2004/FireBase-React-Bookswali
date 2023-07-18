import React from "react";
import { useState, useEffect} from "react";
import { auth, db } from "../../FirebaseConfig/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderProduct from "./SliderProduct";
const ProductSlider = (props) => {
  const [products, setProducts] = useState([]);
  const productsArray = [];
  useEffect(() => {
    const getProducts = () => {
      const path = `products-${props.type.toUpperCase()}`;
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          //console.log(productsArray);
          //setProducts(productsArray);
          setProducts(productsArray);
          //console.log('done');
          //console.log(products_var);
          return productsArray;
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    const Array = getProducts();
  }, []);
  console.log(products);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      <Carousel responsive={responsive}>
      {products.map((element)=>{
            return(
          <SliderProduct
            key={element.id}
            product={element}
          />
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
