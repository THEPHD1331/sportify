import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, UNSAFE_ErrorResponseImpl } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  var loginUserData = sessionStorage.getItem("userdata");
  let userId;
  let token;
  if (loginUserData != null){
   userId = JSON.parse(sessionStorage.getItem("userdata")).id;
   token = JSON.parse(sessionStorage.getItem("userdata")).token;
  }

  useEffect(() => {
    if (!userId || !token) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to view your cart.",
      });
      setLoading(false);
      return;
    }

    

    axios.get(`http://localhost:7700/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const cartId = response.data.data.cart.cartId;
      fetchCart(cartId);
    })
    .catch(error => {
      console.error("Error fetching user cart ID:", error);
      setLoading(false);
    });
  }, []);

  const fetchCart = (cartId) => {
    axios.get(`http://localhost:7700/api/v1/carts/${cartId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setCart(response.data.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching cart:", error);
      setLoading(false);
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your cart will be emptied!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:7700/api/v1/carts/${cart.cartId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setCart(null);
            Swal.fire("Cleared!", "Your cart has been emptied.", "success");
          })
          .catch((error) => {
            console.error("Error clearing cart:", error);
          });
      }
    });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    axios.put(`http://localhost:7700/api/v1/cart-items/cart/${cart.cartId}/item/${itemId}?quantity=${newQuantity}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((result) => {
      fetchCart(cart.cartId);
      console.log(result);
      
    })
    .catch(error =>{
      console.error("Error updating quantity:", error);
      console.log(error);
      
    } );

  };

  if (!userId || !token) return <Container className="mt-5 text-center"><h4>Log in to use cart</h4></Container>;

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (!cart || cart.items.length === 0) {
    return <Container className="mt-5 text-center"><h4>Your cart is empty</h4></Container>;
  }

  return (
    <Container className="mt-4">
       <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Shopping Cart</h2>
        <Button variant="danger" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
      <Row>
        {cart.items.map(item => (
          <Col key={item.itemId} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={item.product.image?.imageUrl ? `http://localhost:7700${item.product.image.imageUrl}` : "https://via.placeholder.com/150"} alt={item.product.productName} className="p-2" />
              <Card.Body>
                <Card.Title>{item.product.productName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.product.brand}</Card.Subtitle>
                <Card.Text>
                  <strong>Price:</strong> ${item.unitPrice} <br />
                  <strong>Total:</strong> ${item.totalPrice}
                </Card.Text>
                <div className="d-flex align-items-center">
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}>-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}>+</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Card className="p-3 mt-4 text-center shadow-sm">
        <h4>Total Price: ${cart.totalAmount}</h4>
        <Link to="/user/order-summary"><Button variant="success" className="mt-3" >Proceed to Checkout</Button></Link>
      </Card>
    </Container>
  );
};

export default Cart;
