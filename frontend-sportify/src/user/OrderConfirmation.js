import React, { useEffect } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const orderDetails = JSON.parse(sessionStorage.getItem("order-details"));
  const userId = JSON.parse(sessionStorage.getItem("userdata")).id;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:7700/api/v1/users/${userId}`)
        .then((response) => {
          const userEmail = response.data.data.email;
          sendOrderConfirmationEmail(userEmail);
        })
        .catch((error) => {
          console.error("Error fetching user details", error);
        });
    }
  }, [userId]);

  const sendOrderConfirmationEmail = (email) => {
    if (!email || !orderDetails) return;
    
    const emailBody = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
      <p><strong>Order Amount:</strong> $${orderDetails.orderAmount}</p>
      <p><strong>Order Date:</strong> ${new Date(orderDetails.orderDate).toLocaleDateString()}</p>
      <p><strong>Estimated Delivery Date:</strong> ${deliveryDate.toLocaleDateString()}</p>
      <p>We appreciate your business!</p>
    `;
    
    axios.post("http://localhost:7700/mail/send", {
      to: email,
      subject: "Order Confirmation - Sportify",
      body: emailBody
    }).then(() => {
      alert("Order confirmed! Check your email")
      console.log("Order confirmation email sent successfully");
    }).catch((error) => {
      console.error("Error sending email", error);
    });
  };

  if (!orderDetails) {
    return <h2 className="text-center text-danger mt-5">No Order Details Found!</h2>;
  }

  const { orderId, orderAmount, orderDate } = orderDetails;
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg text-center">
        <h2 className="text-success">Order Confirmed!</h2>
        <h5 className="mt-3">Thank you for your purchase.</h5>
        <hr />
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Order Amount:</strong> ${orderAmount}</p>
        <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleDateString()}</p>
        <p><strong>Estimated Delivery Date:</strong> {new Date(deliveryDate).toLocaleDateString()}</p>
        <hr />
        <Button variant="primary" onClick={() => navigate("/user/home")}>Go to Home</Button>
      </Card>
    </Container>
  );
}



// import React from "react";
// import { Container, Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// export default function OrderConfirmation() {
//   const navigate = useNavigate();
//   const orderDetails = JSON.parse(sessionStorage.getItem("order-details"));
  
//   if (!orderDetails) {
//     return <h2 className="text-center text-danger mt-5">No Order Details Found!</h2>;
//   }

//   const { orderId, orderAmount, orderDate } = orderDetails;
//   const deliveryDate = new Date(orderDate);
//   deliveryDate.setDate(deliveryDate.getDate() + 5);

//   return (
//     <Container className="mt-5">
//       <Card className="p-4 shadow-lg text-center">
//         <h2 className="text-success">Order Confirmed!</h2>
//         <h5 className="mt-3">Thank you for your purchase.</h5>
//         <hr />
//         <p><strong>Order ID:</strong> {orderId}</p>
//         <p><strong>Order Amount:</strong> ${orderAmount}</p>
//         <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleDateString()}</p>
//         <p><strong>Estimated Delivery Date:</strong> {deliveryDate.toLocaleDateString()}</p>
//         <hr />
//         <Button variant="primary" onClick={() => navigate("/")}>Go to Home</Button>
//       </Card>
//     </Container>
//   );
// }
