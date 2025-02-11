import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#007bff",
        color: "white",
        textAlign: "center",
        padding: "1rem 0",
        position: "bottom",
        width: "100%",
        bottom: 0,
      }}
    >
      <Container>
        <p className="mb-0">&copy; {new Date().getFullYear()} Sportify. All Rights Reserved.</p>
        <p>
          Follow us on:
          <a href="#" className="text-white mx-2">Facebook</a> |
          <a href="#" className="text-white mx-2">Twitter</a> |
          <a href="#" className="text-white mx-2">Instagram</a>
        </p>
      </Container>
    </footer>
  );
}


// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

// export default function Footer() {
//   return (
//     <footer className="bg-dark text-light py-4 mt-5" style={{position: "fixed", width: "100%", bottomd: "0"}}>
//       <Container>
//         <Row>
//           <Col md={4} className="text-center text-md-start">
//             <h5>Sportify</h5>
//             <p>Your one-stop shop for all sports gear.</p>
//           </Col>
//           <Col md={4} className="text-center">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
//               <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
//               <li><a href="/faq" className="text-light text-decoration-none">FAQs</a></li>
//             </ul>
//           </Col>
//           <Col md={4} className="text-center text-md-end">
//             <h5>Follow Us</h5>
//             <p>
//               <a href="#" className="text-light mx-2">Facebook</a> | 
//               <a href="#" className="text-light mx-2">Instagram</a> | 
//               <a href="#" className="text-light mx-2">Twitter</a>
//             </p>
//           </Col>
//         </Row>
//         <hr className="bg-light" />
//         <Row>
//           <Col className="text-center">
//             <p>&copy; {new Date().getFullYear()} Sportify. All Rights Reserved.</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }



// // import React from "react";
// // import { Container, Row, Col } from "react-bootstrap";

// // export default function Footer() {
// //   return (
// //     <footer className="bg-dark text-light py-4 mt-5">
// //       <Container>
// //         <Row>
// //           <Col md={4} className="text-center text-md-start">
// //             <h5>Sportify</h5>
// //             <p>Your one-stop shop for all sports gear.</p>
// //           </Col>
// //           <Col md={4} className="text-center">
// //             <h5>Quick Links</h5>
// //             <ul className="list-unstyled">
// //               <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
// //               <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
// //               <li><a href="/faq" className="text-light text-decoration-none">FAQs</a></li>
// //             </ul>
// //           </Col>
// //           <Col md={4} className="text-center text-md-end">
// //             <h5>Follow Us</h5>
// //             <p>
// //               <a href="#" className="text-light mx-2">Facebook</a> | 
// //               <a href="#" className="text-light mx-2">Instagram</a> | 
// //               <a href="#" className="text-light mx-2">Twitter</a>
// //             </p>
// //           </Col>
// //         </Row>
// //         <hr className="bg-light" />
// //         <Row>
// //           <Col className="text-center">
// //             <p>&copy; {new Date().getFullYear()} Sportify. All Rights Reserved.</p>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </footer>
// //   );
// // }
