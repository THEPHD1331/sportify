import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [productName, setProductName] = useState("");
  var loginUserData = sessionStorage.getItem("userdata");
  let token;
  if (loginUserData != null){
   token = JSON.parse(sessionStorage.getItem("userdata")).token;
  }

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:7700/api/v1/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setCategories(response.data.data);
    })
    .catch(error => {
      console.error("Error fetching categories", error);
    });

    fetchProducts();
  }, []);

  const fetchProducts = async (url = "http://localhost:7700/api/v1/products") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      setProducts(response.data.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleFilter = () => {
    let url = "http://localhost:7700/api/v1/products";
    if (productName && brand){
      url = `http://localhost:7700/api/v1/products/by-name-and-brand?productName=${productName}&brandName=${brand}`;
    }
    else if (category && productName){
      url = `http://localhost:7700/api/v1/products/by-category-and-name?categoryName=${category}&productName=${productName}`;
    }
    else if (category && brand) {
      url = `http://localhost:7700/api/v1/products/by-category-and-brand?categoryName=${category}&brandName=${brand}`;
    } else if (category) {
      url = `http://localhost:7700/api/v1/products/by-category?categoryName=${category}`;
    } else if (brand) {
      url = `http://localhost:7700/api/v1/products/by-brand?brandName=${brand}`;
    } else if (productName) {
      url = `http://localhost:7700/api/v1/products/by-name?productName=${productName}`;
    }
    fetchProducts(url);
  };

  const addToCart = (productId) => {
    if (!sessionStorage.getItem("userdata")) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to access your cart.",
      });
      return;
    }
    
    axios
      .post(
        `http://localhost:7700/api/v1/cart-items?productId=${productId}&quantity=1`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        Swal.fire({ icon: "success", title: "Item Added to Cart!" });
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "Item Not Added!", text: error.message });
      });
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Filter by Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Col>
        {/* <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Filter by Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Col> */}
        <Col md={4}>
          <Form.Select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Filter by Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Filter by Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Col>
        <Col md={1}>
          <Button variant="primary" onClick={handleFilter} className="w-150">
            Apply Filters
          </Button>
        </Col>
      </Row>
      
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-danger text-center">Error: {error}</p>}
      
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card className="h-100 shadow-sm" >
                <Card.Img onClick={() => navigate(`/product/${product.id}`)}
                  variant="top"
                  src={product.image?.imageUrl ? `http://localhost:7700${product.image.imageUrl}` : "https://via.placeholder.com/150"}
                  alt={product.productName}
                  className="p-2"
                />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
                  <Card.Text className="text-truncate" title={product.productDescription}>
                    {product.productDescription}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-success">${product.productPrice}</h5>
                    <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
                  </div>
                  <Button
                    variant={product.itemsInStock > 0 ? "primary" : "secondary"}
                    disabled={product.itemsInStock === 0}
                    className="mt-2 w-100"
                    onClick={() => addToCart(product.id)}
                  >
                    {product.itemsInStock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No products available</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Products;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Container, Row, Col } from "react-bootstrap";
// import Swal from "sweetalert2";


// const Products = () => {
  
//   const sampleProducts = [
//     {
//       id: 1,
//       productName: "Smartphone X",
//       brand: "Brand A",
//       productDescription: "Latest smartphone with high-end features.",
//       productPrice: 799,
//       itemsInStock: 10,
//       rating: 4.5,
//       category: "Electronics",
//       image: { url: "https://via.placeholder.com/150" },
//     }];
//   const [products, setProducts] = useState([sampleProducts]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     axios.get("http://localhost:7700/api/v1/products")
//       .then(response => {
//         console.log(response.data.data);
//         setProducts(response.data.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.message);
//         console.log(error);
        
//         setLoading(false);
//       });
//   }, []);

//   const addToCart = (productId) => {
//     if (sessionStorage.getItem('userdata') == null) {
//       Swal.fire({
//               icon: "warning",
//               title: "Not Logged In",
//               text: "Please log in to access your cart.",
//             });
//     }
//     var userdata = sessionStorage.getItem("userdata");
//     const token = JSON.parse(userdata).token;
//     axios.post(`http://localhost:7700/api/v1/cart-items?productId=${productId}&quantity=1`, {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => {
//       Swal.fire({
//         icon: "success",
//         title: "Item Added to Cart!",
//         text: "",
//       });
//       // alert("Item added to cart");
//     })
//     .catch(error => {
//       Swal.fire({
//         icon: "error",
//         title: "Item Not Added!",
//         text: error.message,
//       });
//       // alert("Failed to add item to cart: " + error.message);
//     });
//   };

//   if (loading) {
//     return <Container className="mt-4 text-center"><p>Loading products...</p></Container>;
//   }

//   if (error) {
//     return <Container className="mt-4 text-center"><p className="text-danger">Error: {error}</p></Container>;
//   }

//   return (
//     <Container className="mt-4">
//       <Row>
//         { products.length > 0 ? (
//           products.map((product) => (
//             <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
//               <Card className="h-100 shadow-sm">
//                 <Card.Img variant="top" src={product.image?.url || "https://via.placeholder.com/150"} alt={product.productName} className="p-2" />
//                 <Card.Body>
//                   <Card.Title>{product.productName}</Card.Title>
//                   <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
//                   <Card.Text className="text-truncate" title={product.productDescription}>
//                     {product.productDescription}
//                   </Card.Text>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <h5 className="text-success">${product.productPrice}</h5>
//                     <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
//                   </div>
//                   <Button 
//                     variant={product.itemsInStock > 0 ? "primary" : "secondary"} 
//                     disabled={product.itemsInStock === 0} 
//                     className="mt-2 w-100"
//                     onClick={() => addToCart(product.id)}
//                   >
//                     {product.itemsInStock > 0 ? "Add to Cart" : "Out of Stock"}
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))) : (
//           <Col className="text-center">
//             <p>No products available</p>
//           </Col>
//         )
//         }
//       </Row>
//     </Container>
//   );
// };

// export default Products;
