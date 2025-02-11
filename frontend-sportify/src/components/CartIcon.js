import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";


const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);
  var loginUserData = sessionStorage.getItem("userdata");
  let userId;
  let token;
  if (loginUserData != null){
   userId = JSON.parse(sessionStorage.getItem("userdata")).id;
   token = JSON.parse(sessionStorage.getItem("userdata")).token;
  }

  useEffect(() => {
 
    axios.get(`http://localhost:7700/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const cartId = response.data.data.cart.cartId;
      console.log("cartId: "+cartId);
      
      fetchCartCount(cartId);
    })
    .catch(error => console.error("Error fetching user cart ID:", error));
  }, []);

  const fetchCartCount = (cartId) => {
    axios.get(`http://localhost:7700/api/v1/carts/${cartId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setCartCount(response.data.data.items.length);
      console.log("items :"+response.data.data.items.length);
      
    })
    .catch(error => console.error("Error fetching cart count:", error));
  };

  
  return (
   
    // <Navbar className="bg-dark shadow-sm p-3">
      // <Nav className="ml-auto">
        // <Nav.Link href="/cart" className="position-relative">
        <>
          <FaShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          )}
          </>
        // </Nav.Link>
      // </Nav>
    // </Navbar>
  );
};

export default CartIcon;
