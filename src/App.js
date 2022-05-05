/*
 * @Author: Liusong He
 * @Date: 2022-04-25 17:52:35
 * @LastEditTime: 2022-04-29 17:13:04
 * @FilePath: \coursework_git\src\App.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import Register from './pages/register_m'
import Login from './pages/login'
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import User_page from './pages/user_page'
import Home from '../src/pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Admin_page from './pages/admin_page'
import Checkout from './pages/Checkout'
import { CartProvider } from './components/CartContext'
import DriverPage from "./pages/DriverPage"
import RestaurantOwnerPage from "./pages/RestaurantOwnerPage"

function App() {
    return (
        <BrowserRouter>
        <CartProvider>
            <ul>
                <li><Link to="/register_m">register</Link></li>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/user_page">User_page</Link></li>
                <li><Link to="/admin_page">Admin_page</Link></li>
                <li><Link to="/driver_page">Driver page</Link></li>
                <li><Link to="/restaurant_owner_page">RestaurantOwnerPage</Link></li>
            </ul>
            <Routes>
                <Route path="user_page" element={<User_page/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="" element={<Home/>}/>
                <Route path="register_m" element={<Register/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="forgot-password" element={<ForgotPassword/>}/>
                <Route path="admin_page" element={<Admin_page/>}/>
                <Route path="checkout" element={<Checkout/>}/>
                <Route path="driver_page" element={<DriverPage/>}/>
                <Route path="restaurant_owner_page" element={<RestaurantOwnerPage/>}/>
            </Routes>
            </CartProvider>
        </BrowserRouter>
    )
}

export default App