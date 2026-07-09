import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AdminLayout from './components/Layout/AdminLayout'
import Homepage from './customer/pages/homepage/homepage'
import Product from './customer/components/Product/Product'
import ProductDetails from './customer/components/ProductDetails/ProductDetails'
import Cart from './customer/components/cart/cart'
import Checkout from './customer/components/cart/CheckOut/checkOut'
import Order from './customer/components/Order/Order'
import OrderDetails from './customer/components/Order/OrderDeatils/OrderDetails'
import Login from './customer/components/Auth/Login'
import Register from './customer/components/Auth/Register'
import SearchResults from './customer/components/Search/SearchResults'
import AdminDashboard from './customer/components/Admin/AdminDashboard/AdminDashboard'
import ProtectedRoute from './components/Guards/ProtectedRoute'
import AdminRoute from './components/Guards/AdminRoute'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Homepage />} />
        <Route path="products/:levelOne/:levelTwo/:levelThree/:levelFour" element={<Product />} />
        <Route path="products/:levelOne/:levelTwo/:levelThree" element={<Product />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="products/search" element={<SearchResults />} />

        {/* Protected customer routes */}
        <Route path="cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="account/order" element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        } />
        <Route path="account/order/:orderId" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />
      </Route>

      {/* Admin route with its own layout */}
      <Route path="admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
