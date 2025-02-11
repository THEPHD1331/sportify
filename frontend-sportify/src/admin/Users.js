import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userPayments, setUserPayments] = useState({}); // Store payments per user
  const [isAdmin, setIsAdmin] = useState(false);

  var loginUserData = sessionStorage.getItem("userdata");
  let userId;
  let token;
  if (loginUserData != null){
   userId = JSON.parse(sessionStorage.getItem("userdata")).id;
   token = JSON.parse(sessionStorage.getItem("userdata")).token;
  }

  useEffect(() => {

    axios.get(`http://localhost:7700/api/v1/users/${userId}/roles`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const roles = response.data.data.map(role => role.name);
      if (roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
        fetchUsers();
      }
    })
    .catch(error => {
      console.log(error);
    });

  }, []);

  const fetchUsers = () => {
      // Fetch all users
    axios
    .get("http://localhost:7700/api/v1/users")
    .then((response) => {
      const userData = response.data.data;
      setUsers(userData);

      // Fetch payments for each user
      const paymentRequests = userData.map((user) =>
        axios
          .get(`http://localhost:5277/api/Payments/user/${user.id}`)
          .then((res) => ({ userId: user.id, payments: res.data.data }))
          .catch(() => ({ userId: user.id, payments: [] })) // Handle errors gracefully
      );

      Promise.all(paymentRequests).then((results) => {
        const paymentsMap = {};
        results.forEach(({ userId, payments }) => {
          paymentsMap[userId] = payments.map((p) => p.paymentID).join(", ") || "No Payments";
        });
        setUserPayments(paymentsMap);
      });
    })
    .catch((error) => {
      console.error("Error fetching users", error);
    });
  }

   if (!isAdmin) return <Container className="mt-5 text-center"><h4>You are not authorized to view this resource! </h4></Container>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">User List</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Mobile No</th>
            <th>Orders</th>
            <th>Cart ID</th>
            <th>Role</th>
            <th>Payment ID</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.mobileNo}</td>
              <td>{user.orders.map((order) => order.id).join(", ") || "No Orders"}</td>
              <td>{user.cart ? user.cart.cartId : "N/A"}</td>
              <td>{user.roles.map((role) => role.name == "ROLE_USER" ? "User" : "Admin").join(", ")}</td>
              <td>{userPayments[user.id] || "Fetching..."}</td> {/* Display payment IDs */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Container } from "react-bootstrap";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [userPayment, setUserPayment] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:7700/api/v1/users")
//       .then((response) => {
//         setUsers(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching users", error);
//       });
      
//   }, []);

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">User List</h2>
//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Mobile No</th>
//             <th>Orders</th>
//             <th>Cart ID</th>
//             <th>Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.userName}</td>
//               <td>{user.email}</td>
//               <td>{user.address}</td>
//               <td>{user.mobileNo}</td>
//               <td>{user.orders.map((order) => order.id).join(", ") || "No Orders"}</td>
//               <td>{user.cart ? user.cart.cartId : "N/A"}</td>
//               <td>{user.roles.map((role) => role.name).join(", ")}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default Users;
