import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'

const OrderCard = ({ order }) => {
  const navigate = useNavigate()

  if (!order) return null

  return (
    <div onClick={() => navigate(`/account/order/${order.id}`)} className='p-5 shadow-lg shadow-md hover:shadow-2xl border cursor-pointer'>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className='flex'>
            <img className='w-[5rem] h-[5rem] object-cover object-top' src={order.image || "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/y/g/34-jeans-bt008-laheja-original-imagqqbsfgmdhcvn.jpeg?q=70"} alt={order.name} />
            <div className='ml-5 space-y-2'>
              <p className=''>{order.name || 'Order Item'}</p>
              <p className='opacity-50 text-xs font-semibold'>Qty: {order.quantity || order.items}</p>
              <p className='opacity-50 text-xs font-semibold'>Size: {order.selectedSize || 'M'}</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>${order.amount || order.price || 1099}</p>
        </Grid>

        <Grid item xs={4}>
          {['Delivered', 'Shipped', 'Confirmed'].includes(order.status) && <div>
            <p>
              <AdjustIcon sx={{ fontSize: "15px", height: "15px" }} className='text-green-600 mr-2 text-sm' />
              <span>
                {order.status === 'Delivered' ? 'Delivered On' : order.status === 'Shipped' ? 'Shipped On' : 'Confirmed On'} {order.date || '2026-07-07'}
              </span>
            </p>
            <p className='text-sm'>Your Item has Been {order.status}</p>
          </div>}

          {order.status === 'Placed' && <p>
            <span>
              Expected delivery on {order.date}
            </span>
          </p>}
        </Grid>

      </Grid>
    </div>
  )
}

export default OrderCard
