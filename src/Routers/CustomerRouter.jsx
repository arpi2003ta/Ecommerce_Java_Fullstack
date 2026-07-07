import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../customer/pages/homepage/homepage'
import Cart from '../customer/components/cart/cart'
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import Checkout from '../customer/components/cart/CheckOut/checkOut'
import Order from '../customer/components/Order/Order'
import OrderDetails from '../customer/components/Order/OrderDeatils/OrderDetails'

const CustomerRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/products/:levelOne/:levelTwo/:levelThree' element={<Product />} />
      <Route path='/product/:productId' element={<ProductDetails />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/account/order' element={<Order />} />
      <Route path='/account/order/:orderId' element={<OrderDetails />} />
    </Routes>
  )
}

export default CustomerRouter
