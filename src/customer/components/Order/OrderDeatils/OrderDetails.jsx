import React from 'react'
import { useParams } from 'react-router-dom'
import AddressCard from '../../AddressCard/AddressCard'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import OrderTracker from '../../OrderTracker/OrderTracker'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { useSelector } from 'react-redux'

const statusSteps = ['Placed', 'Confirmed', 'Shipped', 'Delivered']

const getStepFromStatus = (status) => {
  const idx = statusSteps.findIndex(s => s.toLowerCase() === status?.toLowerCase())
  return idx >= 0 ? idx : 0
}

const OrderDetails = () => {
  const { orderId } = useParams()
  const { orders } = useSelector((store) => store)
  const order = orders.items?.find(o => String(o.id) === String(orderId))

  const activeStep = order ? getStepFromStatus(order.status) : 0

  return (
    <div className='px-5 lg:px-20'>
      <div>
        <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="py-10">
        <OrderTracker activeStep={activeStep} />
      </div>

      <Grid container spacing={2} className="space-x-5">
        {order ? (
          <Grid item container className="shadow-xl rounded-md p-5 border" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Grid item xs={6}>
              <div className='flex items-center space-x-2'>
                <img className="w-[5rem] h-[5rem] object-cover object-top" src={order.image || "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"} alt={order.name || "Order"} />
                <div className='space-y-2 ml-5'>
                  <p>{order.name || 'Order Item'}</p>
                  <p className='font-semibold'><span className="space-x-5">Color: {order.color || 'N/A'}</span> <span>Size: {order.selectedSize || 'M'}</span></p>
                  <p className='space-x-5 opacity-50 text-xs font-semibold'>Seller: {order.seller || 'Zosh'}</p>
                  <p>${order.amount || order.price || 1099}</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon sx={{ fontSize: "4rem" }} className='px-2 text-2xl' />
                <span>
                  Rate & Review Product
                </span>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <p className="text-gray-500">Order not found.</p>
        )}
      </Grid>
    </div>
  )
}

export default OrderDetails
