import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Form, Modal } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    brand: "",
    productDescription: "",
    productPrice: "",
    itemsInStock: "",
    rating: "",
    category: "",
    image: { id: "", imageUrl: "" }
  });
  const [imageFile, setImageFile] = useState(null);
   const [isAdmin, setIsAdmin] = useState(false);

  var loginUserData = sessionStorage.getItem("userdata");
  let userId;
  let token;
  if (loginUserData != null){
   userId = JSON.parse(sessionStorage.getItem("userdata")).id;
   token = JSON.parse(sessionStorage.getItem("userdata")).token;
  }

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:7700/api/v1/users/${userId}/roles`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const roles = response.data.data.map(role => role.name);
      if (roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
        fetchProducts();
      } else {
        setLoading(false);
      }
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:7700/api/v1/products",  {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setProducts(Array.isArray(response.data.data) ? response.data.data : []);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:7700/api/v1/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchProducts())
      .catch(error => setError(error.message));
  };

  const handleImageUpload = (productId) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    axios.post(`http://localhost:7700/api/v1/images/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(() => fetchProducts())
    .catch(error => setError(error.message));
  };

  const handleImageDelete = (imageId) => {
    axios.delete(`http://localhost:7700/api/v1/images/${imageId}`)
      .then(() => fetchProducts())
      .catch(error => setError(error.message));
  };

  const handleSave = () => {
    const url = product.id ? `http://localhost:7700/api/v1/products/${product.id}` : "http://localhost:7700/api/v1/products";
    const method = product.id ? "put" : "post";
    
    axios[method](url, product, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        fetchProducts();
        setShowModal(false);
        setProduct({ id: "", productName: "", brand: "", productDescription: "", productPrice: "", itemsInStock: "", rating: "", category: "", image: { id: "", imageUrl: "" } });
      })
      .catch(error => setError(error.message));
  };

  if (!userId || !token) return <Container className="mt-5 text-center"><h4>Log in to perform this Operation</h4></Container>;
  if (!isAdmin) return <Container className="mt-5 text-center"><h4>You are not authorized to view this resource! </h4></Container>;
  if (loading) return <Container className="mt-4 text-center"><p>Loading products...</p></Container>;
  if (error) return <Container className="mt-4 text-center"><p className="text-danger">Error: {error}</p></Container>;

  return (
    <Container className="mt-4">
      <Button className="mb-3" onClick={() => setShowModal(true)}>Add Product</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.productName}</td>
              <td>{prod.brand}</td>
              <td>{prod.productDescription}</td>
              <td>${prod.productPrice}</td>
              <td>{prod.itemsInStock}</td>
              <td>{prod.rating}</td>
              <td>{prod.category?.name || "No Category"}</td>
              <td>
                {prod.image?.imageUrl ? <img src={prod.image?.imageUrl ? `http://localhost:7700${prod.image.imageUrl}` : "https://via.placeholder.com/150"} alt="Product" width="50" height="50" /> : "No Image"}
              </td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => { setProduct(prod); setShowModal(true); }}>Edit</Button> &nbsp;&nbsp;
                <Button variant="danger" onClick={() => handleDelete(prod.id)}>Delete</Button>&nbsp;&nbsp;
                <Button variant="danger" className="ms-2" onClick={() => handleImageDelete(prod.image.id)}>Delete Image</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{product.id ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={product.productName} onChange={(e) => setProduct({ ...product, productName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={product.productDescription} onChange={(e) => setProduct({ ...product, productDescription: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" value={product.productPrice} onChange={(e) => setProduct({ ...product, productPrice: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" value={product.itemsInStock} onChange={(e) => setProduct({ ...product, itemsInStock: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" step="0.1" value={product.rating} onChange={(e) => setProduct({ ...product, rating: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" value={product.category.name} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImageFile(e.target.files[0])} />
              <Button className="mt-2" onClick={() => handleImageUpload(product.id)}>Upload Image</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Products;
