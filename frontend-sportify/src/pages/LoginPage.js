import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Swal from "sweetalert2";


export default function LoginPage() {

  // declaring useState hook to handle state of login form details and setting deafult to empty
  const [loginDetails, setLoginDetails] = useState({email:'', password:''});
  const navigate = useNavigate();

  const redirectUser = (userdata) => {

    let userId = userdata.id;
    let token = userdata.token;

    axios.get(`http://localhost:7700/api/v1/users/${userId}/roles`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const roles = response.data.data.map(role => role.name);
      if (roles.includes("ROLE_ADMIN")) {
        navigate('/admin');
      } else {
        navigate('/user/home');
      }
    })
    .catch(error => {
      console.log(error);
      
    });
  }

  // Function to get data from loginDetails obj when details are entered
  const doLogin = (event) =>{
    event.preventDefault(); 
    // get creds from user
    let authRequest = {email:loginDetails.email, password:loginDetails.password}

    // Call method to send post request to auth endpoint of springboot API to get JWT token and save it in sessionStorage

    let myheaders={'content-Type':'application/json'}
    // AuthService.authenticateUser(authRequest).then((result) => {
      axios.post("http://localhost:7700/api/v1/auth/login", authRequest, {headers:myheaders}).then((result) => {
      console.log("Data: ",result);
      console.log("Response: "+JSON.stringify(result.data.data));
      
      sessionStorage.setItem('userdata', JSON.stringify(result.data.data));

      redirectUser(result.data.data);
    }).catch((err) => {
      Swal.fire('Oops!', 'Invalid Email or Password', 'error')
      console.log(err);
    })
  }

  // Function to set details in loginDetails state when any field changes
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setLoginDetails({...loginDetails, [name]:value})
    // equi to email:{input}, password:{input}
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "350px", borderRadius: "12px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={doLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              onChange={handleChange}
              value={loginDetails.email}
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              value={loginDetails.password}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        
        <p className="text-center mt-1"> Don't have an account? &nbsp;
          <Link to="/register-user" className="text-decoration-none">Register Here</Link>
        </p>
        <p className="text-center">
          <Link href="#" className="text-decoration-none">Forgot password?</Link>
        </p> 
      </div>
    </div>
  );

//   return (
//     <div>
//   <form onSubmit={doLogin}>
//   <div className="form-group">
//     <label htmlFor="email">Email</label>
//     <input type="text" className="form-control" name='email' id="email"
//     onChange={handleChange} 
//     value={loginDetails.email} 
//     aria-describedby="emailHelp"
//     />
//     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//   </div>
//   <div className="form-group">
//     <label htmlFor="password">Password</label>
//     <input type="password" className="form-control" id="password" name='password' onChange={handleChange} 
//     value={loginDetails.password}
//     />
//   </div>
  
//   <button type="submit" className="btn btn-primary">Submit</button>
// </form>
//     </div>
//   )
}
