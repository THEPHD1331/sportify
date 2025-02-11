import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const UserProfile = () => {
    var loginUserData = sessionStorage.getItem("userdata");
    let userId;
    let token;
    if (loginUserData != null){
     userId = JSON.parse(sessionStorage.getItem("userdata")).id;
     token = JSON.parse(sessionStorage.getItem("userdata")).token;
    }
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ userName: "", address: "", mobileNo: "" });

  useEffect(() => {
    if (!userId || !token) {
      Swal.fire({ icon: "warning", title: "Not Logged In", text: "Please log in to view your profile." });
      setLoading(false);
      return;
    }
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    axios.get(`http://localhost:7700/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setUser(response.data.data);
      setFormData({
        userName: response.data.data.userName,
        address: response.data.data.address,
        mobileNo: response.data.data.mobileNo,
      });
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    axios.put(`http://localhost:7700/api/v1/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      Swal.fire({ icon: "success", title: "Profile Updated", text: "Your profile has been updated successfully." });
      setEditMode(false);
      fetchUserProfile();
    })
    .catch(error => console.error("Error updating profile:", error));
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:7700/api/v1/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire({ icon: "success", title: "Deleted", text: "Your account has been deleted." });
          sessionStorage.clear();
          window.location.href = "/login";
        })
        .catch(error => console.error("Error deleting account:", error));
      }
    });
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (!user) {
    return <Container className="mt-5 text-center"><h4>Please log in to view your profile</h4></Container>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h2 className="text-center">User Profile</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="userName" value={formData.userName} disabled={!editMode} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={user.email} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} disabled={!editMode} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control type="text" name="mobileNo" value={formData.mobileNo} disabled={!editMode} onChange={handleInputChange} />
          </Form.Group>
          {editMode ? (
            <>
              <Button variant="success" className="me-2" onClick={handleUpdateProfile}>Save</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => setEditMode(true)}>Edit Profile</Button> 
          )} &nbsp;&nbsp;
          <Button variant="danger" className="mt-0" onClick={handleDeleteAccount}>Delete Account</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default UserProfile;
