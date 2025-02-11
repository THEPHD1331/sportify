import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    mobileNo: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    // Validation
    if (!user.email.includes("@")) {
      setMessage("Invalid Email!");
      return;
    }
    if (user.mobileNo.length < 10) {
      setMessage("Invalid Mobile Number!");
      return;
    }
    if (user.password.length < 6) {
      setMessage("Password must be at least 6 characters long!");
      return;
    }
    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...userData } = user; // Exclude confirmPassword from the request payload

    try {
      const response = await axios.post("http://localhost:7700/api/v1/users", userData);
      setMessage("User registered successfully! Proceed to Login");
      setUser({ userName: "", email: "", password: "", confirmPassword: "", address: "", mobileNo: "" }); // Reset form

      axios.post("http://localhost:7700/mail/send", {
        to: response.data.data.email,
        subject: "Welcome to Sportify",
        body: `<h2>Hi ${response.data.data.userName}! Thank you for registering with us. Welcome to Sportify, your one-stop destination for sports accessories.<br> Visit the website and start shopping now!!</h2>`
      }).then(() => {
        alert("Registration Success! Check your email");
      }).catch((error) => {
        console.error("Error sending email", error);
      });
    } catch (error) {
      setMessage("Error registering user. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center mb-3">User Registration</h3>
        {message && <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input type="text" className="form-control" name="userName" value={user.userName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Mobile Number</label>
            <input type="tel" className="form-control" name="mobileNo" value={user.mobileNo} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
          <p className="text-center mt-1"> Already Registered? &nbsp;
          <Link to="/login" className="text-decoration-none">Login Here</Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;



// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";

// const RegisterUser = () => {
//   const [user, setUser] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     address: "",
//     mobileNo: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(""); // Reset message

//     // Simple validation
//     if (!user.email.includes("@") || user.mobileNo.length < 10) {
//       setMessage("Invalid Email or Mobile Number!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:7700/api/v1/users", user);
//       setMessage("User registered successfully! Proceed to Login");
//       setUser({ userName: "", email: "", password: "", address: "", mobileNo: "" }); // Reset form

//       axios.post("http://localhost:7700/mail/send", {
//         to: response.data.data.email,
//         subject: "Welcome to Sportify",
//         body: `<h2>Hi ${response.data.data.userName}! Thank you for registering with us. Welcome to Sportify your one-stop destination for Sports accessories.<br> Visit the Website and Start Shopping now!!</h2>`
//       }).then(() => {
//         alert("Registration Success! Check your email");
//       }).catch((error) => {
//         console.error("Error sending email", error);
//       });
//     } catch (error) {
//       setMessage("Error registering user. Try again.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
//         <h3 className="text-center mb-3">User Registration</h3>
//         {message && <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>{message}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label fw-bold">Username</label>
//             <input type="text" className="form-control" name="userName" value={user.userName} onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Email</label>
//             <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Password</label>
//             <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Address</label>
//             <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} required />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Mobile Number</label>
//             <input type="tel" className="form-control" name="mobileNo" value={user.mobileNo} onChange={handleChange} required />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">Register</button>
//           <p className="text-center mt-1"> Already Registered? &nbsp;
//           <Link to="/login" className="text-decoration-none">Login Here</Link>
//         </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterUser;
