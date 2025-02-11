// import axios from "axios";
// import React, { useState } from "react";
// import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
// import { Navigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const Payment = () => {
//   const [paymentMethod, setPaymentMethod] = useState("UPI");
//   const [paymentDetails, setPaymentDetails] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [cardHolder, setCardHolder] = useState("");

//   let orderId=0, orderAmount=0;
//   if (sessionStorage.getItem('order-details') != null){
//    orderId = JSON.parse(sessionStorage.getItem('order-details')).orderId;
//    orderAmount = JSON.parse(sessionStorage.getItem('order-details')).orderAmount;
//   }

//   const handlePayment = () => {
//     if (paymentMethod === "UPI" && !paymentDetails) {
//       Swal.fire("Error", "Please enter your UPI ID", "error");
//       return;
//     }
//     if (
//       paymentMethod === "Card" &&
//       (!cardNumber || !expiryDate || !cvv || !cardHolder)
//     ) {
//       Swal.fire("Error", "Please fill in all card details", "error");
//       return;
//     }
    
//     axios.patch(`http://localhost:7700/api/v1/orders/${orderId}/status?newStatus=processing`)
//           .then(() => {
//             Swal.fire("Success", "Payment processed successfully!", "success");
//             Navigate("/order-confirmation");
//           })
//           .catch((error) => {
//             Swal.fire("Error", "Something went wrong", "error");
//             console.error("Error updating order status:", error);
//           });
//   };

//   return (
//     <Container className="mt-5">
//       <Card className="p-4 shadow-lg">
//         <h2 className="text-center">Payment</h2>
//         <h4 className="text-center text-success">Total Price: ${orderAmount}</h4>

//         <Form>
//           <Form.Group>
//             <Form.Label>Select Payment Method:</Form.Label>
//             <Form.Check
//               type="radio"
//               label="UPI"
//               name="paymentMethod"
//               checked={paymentMethod === "UPI"}
//               onChange={() => setPaymentMethod("UPI")}
//             />
//             <Form.Check
//               type="radio"
//               label="Credit/Debit Card"
//               name="paymentMethod"
//               checked={paymentMethod === "Card"}
//               onChange={() => setPaymentMethod("Card")}
//             />
//           </Form.Group>

//           {paymentMethod === "UPI" ? (
//             <Form.Group className="mt-3">
//               <Form.Label>Enter UPI ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="example@upi"
//                 value={paymentDetails}
//                 onChange={(e) => setPaymentDetails(e.target.value)}
//               />
//             </Form.Group>
//           ) : (
//             <>
//               <Form.Group className="mt-3">
//                 <Form.Label>Card Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="1234-5678-9012-3456"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                 />
//               </Form.Group>

//               <Row className="mt-3">
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>Expiry Date</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="MM/YY"
//                       value={expiryDate}
//                       onChange={(e) => setExpiryDate(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group>
//                     <Form.Label>CVV</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="123"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Form.Group className="mt-3">
//                 <Form.Label>Cardholder Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="John Doe"
//                   value={cardHolder}
//                   onChange={(e) => setCardHolder(e.target.value)}
//                 />
//               </Form.Group>
//             </>
//           )}

//           <Row className="mt-4 text-center">
//             <Col>
//               <Button variant="primary" onClick={handlePayment} className="w-50">
//                 Make Payment
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Payment;



import React, { useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Payment() {
    // let orderDetails = JSON.parse(sessionStorage.getItem('order-details'));
    let orderId=0, orderAmount=0;
      if (sessionStorage.getItem('order-details') != null){
       orderId = JSON.parse(sessionStorage.getItem('order-details')).orderId;
       orderAmount = JSON.parse(sessionStorage.getItem('order-details')).orderAmount;
      }
      var loginUserData = sessionStorage.getItem("userdata");
  let userId;
  let token;
  if (loginUserData != null){
   userId = JSON.parse(sessionStorage.getItem("userdata")).id;
   token = JSON.parse(sessionStorage.getItem("userdata")).token;
  }
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const navigate = useNavigate();

  
    // console.log(orderDetails);
    
  const handlePayment = () => {
    if (!paymentDetails) {
      alert("Please enter payment details");
      return;
    }
    
    axios.patch(`http://localhost:7700/api/v1/orders/${orderId}/status?newStatus=processing`)
      .then(() => {
        console.log("Order is Processing!");
        
      })
      .catch((error) => {
        // alert("Payment Failed! Please try again.");
        console.error("Error updating order status:", error);
      });

      axios.post(`http://localhost:5277/api/Payments`, {
        paymentMethod: paymentMethod,
        amount: orderAmount,
        orderId: orderId,
        userId: userId
      })
      .then(() => {
        Swal.fire("Success", "Payment Successful! Order is now Processing", "success");
        navigate("/user/order-confirmation");
      })
      .catch((error) => {
        Swal.fire("Oops!", "Something went wrong", "error");
        console.error("Error updating order status:", error);
      });
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">Payment</h2>
        <h4 className="text-center text-success">Total Price: ${orderAmount}</h4>
        
        <Form>
          <Form.Group>
            <Form.Label>Select Payment Method:</Form.Label>
            <Form.Check
              type="radio"
              label="UPI"
              name="paymentMethod"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
            />
            <Form.Check
              type="radio"
              label="Credit/Debit Card"
              name="paymentMethod"
              checked={paymentMethod === "Card"}
              onChange={() => setPaymentMethod("Card")}
            />
          </Form.Group>

          {paymentMethod === "UPI" ? (
            <Form.Group className="mt-3">
              <Form.Label>Enter UPI ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="example@upi"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              />
            </Form.Group>
          ) : (
            <>
              <Form.Group className="mt-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1234-5678-9012-3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mt-3">
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          
          <Row className="mt-4 text-center">
            <Col>
              <Button variant="primary" onClick={handlePayment} className="w-50">Make Payment</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
