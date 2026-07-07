import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/store';

const HomeSectionCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product?.id) return;
    dispatch(addToCart({ ...product, id: product.id }));
  };

  return (
    <div
      className='cursor-pointer flex flex-col bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] ms-3 relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product?.discount && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
          {product.discount} OFF
        </span>
      )}
      <div className='h-[13rem] w-full overflow-hidden'>
        <img
          className={`object-contain object-center w-full h-full transition-transform duration-300 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          src={product?.image || ""}
          alt={product?.name || "Product"}
        />
      </div>
      <div className="p-4">
        <h3 className='text-lg font-medium text-gray-900 truncate'>{product?.name || "Product"}</h3>
        <div className={`transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-0 opacity-0 mt-0' : 'max-h-16 opacity-100'}`}>
          <div className="mt-2">
            {product?.discountedPrice ? (
              <>
                <span className="text-sm text-gray-500 line-through mr-2">₹{product?.originalPrice}</span>
                <span className="text-sm font-bold text-red-600">₹{product?.discountedPrice}</span>
              </>
            ) : (
              <span className="text-sm text-gray-500">₹{product?.price}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className={`mt-3 w-full bg-indigo-600 text-white text-sm font-medium py-2 rounded-md transition-all duration-200 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'} hover:bg-indigo-700 active:scale-95 active:bg-indigo-800`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default HomeSectionCard;