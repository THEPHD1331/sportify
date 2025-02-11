import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './user/Home';
import ShowProducts from './user/ShowProducts';
import Categories from './admin/Categories';
import Products from './admin/Products';
import RegisterUser from './pages/RegisterUser';
import Cart from './user/Cart';
import UserProfile from './user/UserProfile';
import OrderSummary from './user/OrderSummary';
import UserOrders from './user/UserOrders';
import Payment from './user/Payment';
import OrderConfirmation from './user/OrderConfirmation';
import Footer from './components/Footer';
import ViewProduct from './user/ViewProduct';
import AdminPanel from './admin/AdminPanel';
import Users from './admin/Users';
import UserPanel from './user/UserPanel';

function App() {
  return (
    <div>
      <Routes>
        {/* Common Routes  */}
        <Route path="/" element={<Navigate replace to="/login"></Navigate> }></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register-user" element={<RegisterUser/>}></Route>

          {/* Parent route /user and its respective child routes inside it */}
        <Route path="/user" element={<UserPanel /> }>
          <Route path="home" element={<Home/> }></Route>
          <Route path="products" element={<ShowProducts/>}></Route>
          <Route path="product/:productId" element={<ViewProduct />}></Route>
          <Route path="cart" element={<Cart/> }></Route>
          <Route path="user-profile" element={<UserProfile/> }></Route>
          <Route path="order-summary" element={<OrderSummary/> }></Route>
          <Route path="user-orders" element={<UserOrders/> }></Route>
          <Route path="payment" element={<Payment/>}></Route>
          <Route path="order-confirmation" element={<OrderConfirmation/>}></Route>
        </Route>

        <Route path="/admin" element={<AdminPanel /> }>
          <Route index element={<h2>Welcome to Admin Panel</h2>} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
        </Route>

      </Routes>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
