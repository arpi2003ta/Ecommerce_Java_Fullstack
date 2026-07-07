import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../../redux/store'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector((store) => store)

  const handleCheckout = () => {
    navigate("/checkout?step=2")
  }

  const handleQuantityChange = (id, delta) => {
    const item = cart.cart.find(i => i.id === id)
    if (!item) return
    const newQty = item.quantity + delta
    if (newQty <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity: newQty }))
    }
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <button 
          onClick={handleClearCart} 
          className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
        >
          Clear Cart
        </button>
      </div>
      <div className='lg:grid grid-cols-3 lg:px-16 relative'>
        <div className='col-span-2'>
          {cart.cart && cart.cart.length > 0 ? (
            cart.cart.map((item) => (
              <div key={item.id} className="p-5 shadow-lg border rounded-md mb-4">
                <div className='flex items-center'>
                  <div className='w-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img className="w-full h-full object-cover object-top" src={item.imageUrl || item.image || ""} alt={item.name} />
                  </div>
                  <div className='ml-5 space-y-1'>
                    <p className='font-semibold'>{item.name}</p>
                    <p className='opacity-70'>Size: {item.selectedSize || 'M'}, Color: {item.color || 'N/A'}</p>
                    <p className='opacity-70'>Seller: Zosh</p>
                    <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                      <p className="font-semibold">₹{item.discountedPrice || item.price}</p>
                      <p className="opacity-50 line-through">₹{item.price}</p>
                      <p className="text-green-600 font-semibold">
                        {item.discountPercentage ? `${Math.round((item.discountPercentage / item.price) * 100)}% OFF` : ''}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:flex items-center lg:space-x-10 pt-4">
                  <div className='flex items-center space-x-2'>
                    <IconButton onClick={() => handleQuantityChange(item.id, -1)} sx={{ bgcolor: "RGB(145 85 253)" }}>
                      <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <IconButton onClick={() => handleQuantityChange(item.id, 1)} sx={{ bgcolor: "RGB(145 85 253)" }}>
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </div>
                  <div className=''>
                    <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => handleRemove(item.id)}>Remove</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
          )}
        </div>

        <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
          <div className='border'></div>
          <p className='uppercase font-bold opacity-60 pb-4'>Price Details</p>
          <hr />

          <div className='space-y-3 font-semibold'>
            <div className='flex justify-between pt-3 text-black'>
              <span>Total Price</span>
              <span>₹{cart.totalPrice || 0}</span>
            </div>

            <div className='flex justify-between pt-3 text-green-600'>
              <span>Total Discount</span>
              <span>-₹{cart.totalDiscount || 0}</span>
            </div>

            <div className='flex justify-between pt-3 text-green-600'>
              <span>Delivery Charges</span>
              <span>{cart.delivery === 0 ? 'Free' : `₹${cart.delivery}`}</span>
            </div>

            <div className='flex justify-between pt-3 text-green-600'>
              <span>Total Amount</span>
              <span className='text-green-600'>₹{cart.totalPayable || 0}</span>
            </div>

          </div>

          <Button onClick={handleCheckout} variant="contained" className='w-full mt-5' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}>
            Checkout
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Cart
