import React from 'react'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, updateOrderStatus, clearFilters } from '../../../redux/store'
import OrderCard from './Ordercard'

const orderStatus = [
  { label: "On the Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" }
]

const Order = () => {
  const dispatch = useDispatch()
  const { orders } = useSelector((store) => store)

  const handleStatusChange = (status) => {
    dispatch(clearFilters?.() || (() => {})) // no-op if not used
  }

  return (
    <div className='px-5 lg:px-2'>
      <Grid container sx={{ justifyContent: "space-between" }} spacing={2}>
        <Grid item xs={2.5}>
          <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className='font-semibold'>ORDER STATUS</h1>
              {orderStatus.map((option, index) => (
                <div key={option.value} className='flex items-center'>
                  <input
                    type="checkbox"
                    className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                    onChange={(e) => {
                      // For now, filter by status in UI only (could be enhanced with URL params)
                    }}
                  />
                  <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        <Grid item xs={9}>
          <div className='space-y-4'>
            {orders.items && orders.items.length > 0 ? (
              orders.items.map((order, index) => (
                <OrderCard key={order.id || index} order={order} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No orders found.</p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Order
