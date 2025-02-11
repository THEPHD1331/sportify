import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";

export default function ViewProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:7700/api/v1/products/${productId}`)
      .then((response) => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h4>Product not found</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-1">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={`http://localhost:7700${product.image.imageUrl}`} alt={product.productName} />
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Brand: {product.brand}</Card.Subtitle>
              <Card.Text>{product.productDescription}</Card.Text>
              <Card.Text>Price: ₹{product.productPrice}</Card.Text>
              <Card.Text>Stock: {product.itemsInStock}</Card.Text>
              <Card.Text>Rating: {product.rating} ⭐</Card.Text>
              <Card.Text>Category: {product.category.name}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
