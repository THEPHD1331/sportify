import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Home() {

  let name="";
  if (sessionStorage.getItem('userdata') != null){
         name = JSON.parse(sessionStorage.getItem('userdata')).username;
      }
  return (
    <Container fluid className="p-0">
      <header className="bg-dark text-white text-center py-5">
        <h1>Welcome to Sportify {name}</h1>
        <p>Your Ultimate Destination for Sports Gear</p>
        <NavLink to="/user/products">
          <Button variant="warning" size="lg" className="mt-3">Shop Now</Button>
        </NavLink>
      </header>
      
      <Container className="mt-5">
        <Row className="text-center">
          <Col md={4}>
            <Card className="shadow-lg border-0">
            <Card.Img variant="top" src="/images/football.jpeg" />
              <Card.Body>
                <Card.Title>FootBall</Card.Title>
                <Card.Text>Find premium quality sports apparel for all activities.</Card.Text>
                <NavLink to="/products">
                  <Button variant="primary">Explore</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg border-0">
              <Card.Img variant="top" src="/images/cricket.jfif" />
              <Card.Body>
                <Card.Title>Cricket</Card.Title>
                <Card.Text>High-performance equipment to level up your game.</Card.Text>
                <NavLink to="/products">
                  <Button variant="primary">Explore</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg border-0">
              <Card.Img variant="top" src="/images/swimming.jfif" />
              <Card.Body>
                <Card.Title>Swimming</Card.Title>
                <Card.Text>Comfortable and durable wear for all terrains.</Card.Text>
                <NavLink to="/products">
                  <Button variant="primary">Explore</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}



// import { Button } from "react-bootstrap";
// import React from 'react';
// import { Link } from 'react-router-dom';

// function WelcomeUser(){
//   if (sessionStorage.getItem('userdata') != null){
//     let data = sessionStorage.getItem('userdata');
//     return <><h1>Hii {JSON.parse(data).username} !!</h1></>;
//   } else {
//     return (
//       <>
//         <h2> Join Sportify</h2>
//         <Link to="/login"><Button variant="primary" className="mt-3" >Login</Button></Link>  &nbsp;&nbsp;
//         <Link to="/register-user"><Button variant="primary" className="mt-3" >Register</Button></Link>
//       </>
//     );
//   }
// }

// export default function Home() {
//   return (
//     <div>
//       <p className='text-center'>
//         <h1>Welcome to Sportify!!</h1>
//         <br/>
//         <WelcomeUser />
//         <br />
//         <br />
//         <h2>Start Here:</h2>
//         <Link to="/products"><Button variant="success" className="mt-3">Browse Products</Button></Link>
//       </p>
//     </div>
//   );
// }
