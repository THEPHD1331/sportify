import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet, NavLink } from "react-router-dom";
import Swal from "sweetalert2";


function userLogout() {
  if (sessionStorage.getItem('userdata') != null) {
    sessionStorage.clear();
    window.location.href = '/user/home';
  } else {
    Swal.fire('Login first to Logout!', '', 'warning');
  }
}

const AdminPanel = () => {
  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-lg p-3">
      <NavLink className="navbar-brand text-black font-weight-bold" to="/home">Sportify Admin</NavLink>
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
          <NavLink className="nav-link text-white font-weight-bold" to="/login">Login</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="products">Products</NavLink> 
          <NavLink className="nav-link text-white font-weight-bold" to="categories">Categories</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="users">Users</NavLink>
           &nbsp;&nbsp;&nbsp;
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

export default AdminPanel;
