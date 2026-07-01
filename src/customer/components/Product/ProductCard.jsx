import React from "react";
import "./Productcard.css"


const ProductCard = ({ product }) => {
    return (
        <div className="productCard w-[15rem] m-3 transatio-all cursor-pointer">
            <div className=" h-[20rem]">
                <img className="h-full w-full object-cover object-left-top" src=" /* IMAGE OF PRODUCT ON CARD*/ " alt="{product.imageUrl} " />
                <div />

                <div className=" textpart bg-white p-3">
                    <div>
                        <p className="font-bold opacity-60" >{product.brand}</p>
                        <p>Casual Puff Sleeves Sold Women White Top</p>
                    </div>
                    <div className="flex item-centre space-x-2 ">
                        <p className=" font-semibold"> {product.discountedPrice} </p>
                        <p className="line-through opacity- 50"> {product.price} </p>
                        <p className="text-green-600 font-semibold"> {<product className="discountPerc"> </product></p>
                    </div>

                </div>
            </div>
            )
}

export default ProductCard