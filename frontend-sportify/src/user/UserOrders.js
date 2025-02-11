import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, ListGroup, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
        text: "Please log in to view your orders.",
      });
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:7700/api/v1/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setOrders(response.data.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const cancelOrder = (orderId, orderStatus) => {
    if (orderStatus === "CANCELLED"){
      Swal.fire("Oops!", "Your order has already been cancelled.", "error");
    } else if (orderStatus === "SHIPPED"){
      Swal.fire("Oops!", "Your order has been shipped. It can't be cancelled now", "error");
    } else if (orderStatus === "DELIVERED"){
      Swal.fire("Oops!", "Your order has been already delivered", "error");
    }
    else{
        Swal.fire({
          title: "Are you sure?",
          text: "Your order will be cancelled!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.patch(`http://localhost:7700/api/v1/orders/${orderId}/status?newStatus=cancelled`, {}, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
              Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
              // setOrders(orders.filter(order => order.id !== orderId));
            })
            .catch(error => {
              Swal.fire("Error!", "Failed to cancel order.", "error");
            });
          }
        });
    }
  };

  if (!userId || !token) return <Container className="mt-5 text-center"><h4>Log in to see your Orders</h4></Container>;
  if (loading) return <Container className="text-center mt-4"><p>Loading orders...</p></Container>;
  if (error) return <Container className="text-center mt-4"><Alert variant="danger">Error: {error}</Alert></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Your Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info" className="text-center">No orders found.</Alert>
      ) : (
        orders.map(order => (
          <Card key={order.id} className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>Order ID: {order.id}</Card.Title>
                <Button variant="danger" onClick={() => cancelOrder(order.id, order.status)}>Cancel Order</Button>
              </div>
              <Card.Subtitle className="mb-2 text-muted">Order Date: {order.orderDate}</Card.Subtitle>
              <Card.Text>
                <strong>Status:</strong> <span className="badge bg-warning text-dark">{order.status}</span>
              </Card.Text>
              <h5>Total: <span className="text-success">${order.totalAmount}</span></h5>
              <ListGroup variant="flush" className="mt-3">
                {order.items.map(item => (
                  <ListGroup.Item key={item.productId}>
                    <div className="d-flex justify-content-between">
                      <span>
                        <strong>{item.productName}</strong> ({item.productBrand})
                      </span>
                      <span>x{item.quantity} - ${item.price}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UserOrders;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Card, Button, ListGroup, Alert } from "react-bootstrap";
// import Swal from "sweetalert2";

// const UserOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   var loginUserData = sessionStorage.getItem("userdata");
//   let userId;
//   let token;
//   if (loginUserData != null){
//    userId = JSON.parse(sessionStorage.getItem("userdata")).id;
//    token = JSON.parse(sessionStorage.getItem("userdata")).token;
//   }

//   useEffect(() => {
//     if (!userId || !token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Not Logged In",
//         text: "Please log in to view your orders.",
//       });
//       setLoading(false);
//       return;
//     }

//     axios.get(`http://localhost:7700/api/v1/orders/user/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => {
//       setOrders(response.data.data);
//       setLoading(false);
//     })
//     .catch(error => {
//       setError(error.message);
//       setLoading(false);
//     });
//   }, []);

//   if (!userId || !token) return <Container className="mt-5 text-center"><h4>Log in to see your Orders</h4></Container>;
//   if (loading) return <Container className="text-center mt-4"><p>Loading orders...</p></Container>;
//   if (error) return <Container className="text-center mt-4"><Alert variant="danger">Error: {error}</Alert></Container>;

//   return (
//     <Container className="mt-4">
//       <h2 className="mb-4 text-center">Your Orders</h2>
//       {orders.length === 0 ? (
//         <Alert variant="info" className="text-center">No orders found.</Alert>
//       ) : (
//         orders.map(order => (
//           <Card key={order.id} className="mb-3 shadow-sm">
//             <Card.Body>
//               <Card.Title>Order ID: {order.id}</Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">Order Date: {order.orderDate}</Card.Subtitle>
//               <Card.Text>
//                 <strong>Status:</strong> <span className="badge bg-warning text-dark">{order.status}</span>
//               </Card.Text>
//               <h5>Total: <span className="text-success">${order.totalAmount}</span></h5>
//               <ListGroup variant="flush" className="mt-3">
//                 {order.items.map(item => (
//                   <ListGroup.Item key={item.productId}>
//                     <div className="d-flex justify-content-between">
//                       <span>
//                         <strong>{item.productName}</strong> ({item.productBrand})
//                       </span>
//                       <span>x{item.quantity} - ${item.price}</span>
//                     </div>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// };

// export default UserOrders;
