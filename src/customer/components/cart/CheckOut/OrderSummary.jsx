import React from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddressCard from "../../AddressCard/AddressCard";
import CartItem from "../CartItem";
import { removeFromCart, updateQuantity } from "../../../redux/store";

const OrderSummary = ({ savedAddress }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);

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

  return (
    <div>
      {/* Address Section */}
      <div className="p-5 shadow-lg rounded-md border">
        <AddressCard address={savedAddress} />
      </div>

      {/* Cart & Price Details */}
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        {/* Cart Items */}
        <div className="col-span-2">
          {cart.cart && cart.cart.length > 0 ? (
            cart.cart.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
          )}
        </div>

        {/* Price Details */}
        <div className="px-5 sticky top-0 h-screen mt-5 lg:mt-0">
          <div className="border"></div>

          <p className="uppercase font-bold opacity-60 pb-4">
            Price Details
          </p>

          <hr />

          <div className="space-y-3 font-semibold">
            <div className="flex justify-between pt-3 text-black">
              <span>Price</span>
              <span>₹{cart.totalPrice || 0}</span>
            </div>

            <div className="flex justify-between pt-3 text-green-600">
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
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
