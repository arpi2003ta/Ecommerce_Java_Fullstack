import React from 'react';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className='flex items-center'>
        <div className='w-[5rem] lg:w-[9rem] lg:h-[9rem]'>
          <img className="w-full h-full object-cover object-top" src={item?.imageUrl || item?.image || ""} alt={item?.name || "Product"} />
        </div>
        <div className='ml-5 space-y-1'>
          <p className='font-semibold'>{item?.name || 'Product'}</p>
          <p className='opacity-70'>Size: {item?.selectedSize || 'M'}, Color: {item?.color || 'N/A'}</p>
          <p className='opacity-70'>Seller: {item?.seller || 'Zosh'}</p>
          <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
            <p className="font-semibold">₹{item?.discountedPrice || item?.price || 0}</p>
            <p className="opacity-50 line-through">₹{item?.price || 0}</p>
            {item?.discountPercentage && <p className="text-green-600 font-semibold">{item.discountPercentage}% OFF</p>}
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className='flex items-center space-x-2'>
          <IconButton onClick={() => onQuantityChange?.(item.id, -1)} sx={{ bgcolor: "RGB(145 85 253)" }}>
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
          <span className="px-3 py-1">{item?.quantity || 1}</span>
          <IconButton onClick={() => onQuantityChange?.(item.id, 1)} sx={{ bgcolor: "RGB(145 85 253)" }}>
            <AddCircleOutlinedIcon />
          </IconButton>
        </div>
        <div className=''>
          <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => onRemove?.(item.id)}>Remove</Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
