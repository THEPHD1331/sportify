import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import CartIcon from "../components/CartIcon";
import Swal from "sweetalert2";


function userLogout() {
  if (sessionStorage.getItem('userdata') != null) {
    sessionStorage.clear();
    window.location.href = '/user/home';
  } else {
    Swal.fire('Login first to Logout!', '', 'warning');
  }
}

const UserPanel = () => {
  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-lg p-3">
      <NavLink className="navbar-brand text-white font-weight-bold" to="/home">Sportify</NavLink>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <NavLink className="nav-link text-white font-weight-bold" to="home">Home</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="/register-user">Register</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="/login">Login</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="products">Show Products</NavLink> 
          <NavLink className="nav-link text-white font-weight-bold" to="user-profile">Profile</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="user-orders">My Orders</NavLink>
          <NavLink className="nav-link text-white font-weight-bold position-relative" to="cart">
            <CartIcon />
          </NavLink> &nbsp;&nbsp;&nbsp;
          <NavLink 
            className="nav-link text-white font-weight-bold bg-danger px-3 rounded" 
            onClick={userLogout}
            style={{ cursor: 'pointer' }}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
    <div className="container mt-4">
            <Outlet />
          </div>
    </>
  );
};

export default UserPanel;
