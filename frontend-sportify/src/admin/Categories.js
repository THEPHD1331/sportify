import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Form, Modal } from "react-bootstrap";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState({ id: "", name: "", categoryDescription: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  
  var loginUserData = sessionStorage.getItem("userdata");
  let userId;
  let token;
  if (loginUserData != null){
   userId = JSON.parse(sessionStorage.getItem("userdata")).id;
   token = JSON.parse(sessionStorage.getItem("userdata")).token;
  }


  // useEffect(() => {
  //   fetchCategories();
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
        fetchCategories();
      } else {
        setLoading(false);
      }
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, []);


  
  const fetchCategories = () => {
  axios.get("http://localhost:7700/api/v1/categories",  {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      console.log("API Response:", response.data); // Debugging Log
      setCategories(Array.isArray(response.data.data) ? response.data.data : []); // Ensure it's an array
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
};

  const handleDelete = (id) => {
    axios.delete(`http://localhost:7700/api/v1/categories/${id}`,  {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchCategories())
      .catch(error => setError(error.message));
  };

  const handleSave = () => {
    const url = category.id ? `http://localhost:7700/api/v1/categories/${category.id}` : "http://localhost:7700/api/v1/categories";
    const method = category.id ? "put" : "post";
    
    axios[method](url, category,  {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        fetchCategories();
        setShowModal(false);
        setCategory({ id: "", name: "", categoryDescription: "" });
      })
      .catch(error => setError(error.message));
  };

  if (!userId || !token) return <Container className="mt-5 text-center"><h4>Log in to perform this Operation</h4></Container>;
  if (!isAdmin) return <Container className="mt-5 text-center"><h4>You are not authorized to view this resource! </h4></Container>;
  if (loading) return <Container className="mt-4 text-center"><p>Loading categories...</p></Container>;
  if (error) return <Container className="mt-4 text-center"><p className="text-danger">Error: {error}</p></Container>;

  return (
    <Container className="mt-4">
      <Button className="mb-3" onClick={() => setShowModal(true)}>Add Category</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.categoryDescription}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => { setCategory(cat); setShowModal(true); }}>Edit</Button> &nbsp;&nbsp;
                <Button variant="danger" onClick={() => handleDelete(cat.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{category.id ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={category.categoryDescription} onChange={(e) => setCategory({ ...category, categoryDescription: e.target.value })} />
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

export default Categories;
