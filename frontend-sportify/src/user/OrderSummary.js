import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const OrderSummary = () => {
    var loginUserData = sessionStorage.getItem("userdata");
    let userId;
    let token;
    if (loginUserData != null){
     userId = JSON.parse(sessionStorage.getItem("userdata")).id;
     token = JSON.parse(sessionStorage.getItem("userdata")).token;
    }
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !token) {
      Swal.fire({ icon: "warning", title: "Not Logged In", text: "Please log in to view your order summary." });
      setLoading(false);
      return;
    }
    placeOrder();
  }, []);

  const placeOrder = () => {
    axios.post(`http://localhost:7700/api/v1/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setOrder(response.data.data);
      sessionStorage.setItem("order-details", JSON.stringify(
        {
          orderId: response.data.data.id, 
          orderAmount: response.data.data.totalAmount, 
          orderDate: response.data.data.orderDate
        }
      ));
      setLoading(false);
    })
    .catch(error => {
      console.error("Error placing order:", error);
      setLoading(false);
    });
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (!order) {
    return <Container className="mt-5 text-center"><h4>Order could not be placed.</h4></Container>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h2 className="text-center">Order Summary</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={item.productId}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.productBrand}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h4 className="text-end mt-3">Total Amount: ${order.totalAmount}</h4>
        <Link to="/user/payment"><Button variant="success" className="w-100 mt-3">Confirm Order</Button></Link>

      </Card>
    </Container>
  );
};

export default OrderSummary;
