import React from 'react';
import { NavLink } from 'react-router-dom';
import CartIcon from './CartIcon';
import Swal from 'sweetalert2';

function userLogout() {
  if (sessionStorage.getItem('userdata') != null) {
    sessionStorage.clear();
    window.location.href = '/home';
  } else {
    Swal.fire('Login first to Logout!', '', 'warning');
    
  }
}

export default function NavBar() {
  return (
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
          <NavLink className="nav-link text-white font-weight-bold" to="/home">Home</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="/register-user">Register</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="/login">Login</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="/products">Show Products</NavLink> 
          <NavLink className="nav-link text-white font-weight-bold" to="/user-profile">Profile</NavLink>
          <NavLink className="nav-link text-white font-weight-bold" to="/user-orders">My Orders</NavLink>
          <NavLink className="nav-link text-white font-weight-bold position-relative" to="/cart">
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
  );
}




// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import CartIcon from './CartIcon'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import UserProfile from '../pages/UserProfile';

// function userLogout() {
//   if (sessionStorage.getItem('userdata') != null) {
//     sessionStorage.clear();
//     window.location.href = '/home';
//   }
// }

// export default function NavBar() {
//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           <NavLink to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Sportify</NavLink>
//         </Typography>
//         <Button color="inherit" component={NavLink} to="/home">Home</Button>
//         <Button color="inherit" component={NavLink} to="/register-user">Register</Button>
//         <Button color="inherit" component={NavLink} to="/login">Login</Button>
//         <Button color="inherit" component={NavLink} to="/products">Show Products</Button>
//         <Button color="inherit" component={NavLink} to="/admin/categories">Categories</Button>
//         <Button color="inherit" component={NavLink} to="/admin/products">Products</Button>
//         <Button color="inherit" component={NavLink} to="/user-profile">Profile</Button>
//         <Button color="inherit" component={NavLink} to="/user-orders">My Orders</Button>
//         <IconButton color="inherit" component={NavLink} to="/cart">
//           <CartIcon />
//         </IconButton>
//         <Button color="inherit" onClick={userLogout}>Logout</Button>
//       </Toolbar>
//     </AppBar>
//   );
// }



// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import CartIcon from './CartIcon'
// import  { Redirect } from 'react-router-dom'
// import UserProfile from '../pages/UserProfile'

// function userLogout()  {

//   if (sessionStorage.getItem('userdata') != null){
//   sessionStorage.clear();
//   window.location.href = '/home';
//   } 
// }


// export default function NavBar() {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//   <NavLink className="navbar-brand" href="/home">Sportify</NavLink>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//     <div className="navbar-nav">
//       <NavLink className="nav-link active" to="/home">Home <span className="sr-only">(current)</span></NavLink>
//       <NavLink className="nav-link active" to="/register-user">Register</NavLink>
//       <NavLink className="nav-link active" to="/login">Login</NavLink>
//       <NavLink className="nav-link active" to="/products">Show Products</NavLink> 
//       <NavLink className="nav-link active" to="/admin/categories">Categories</NavLink> 
//       <NavLink className="nav-link active" to="/admin/products">Products</NavLink> 
//       <NavLink className="nav-link active" to="/user-profile">Profile</NavLink>
//       <NavLink className="nav-link active" to="/user-orders">My Orders</NavLink>
//       <NavLink className="ml-auto position-relative" to="/cart"><CartIcon></CartIcon></NavLink>
//       <NavLink className="nav-link active" onClick={userLogout}>Logout</NavLink>

//     </div>
//   </div>
// </nav>
//     </div>
//   )
// }
