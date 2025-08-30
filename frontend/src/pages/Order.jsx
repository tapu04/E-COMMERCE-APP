import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
    const { products, currency } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    return (
        <div className="border-t pt-16 border-gray-200">
            <div className="text-2xl ">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>

            <div>
                {products.slice(1, 4).map((item, index) => (
                    <div
                        key={index}
                        className="p-4 border-t border-b border-gray-200 text-gray-700 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        {/* Left Section */}
                        <div className="flex items-start gap-4 w-full sm:w-auto">
                            <img
                                className="w-20 h-20 object-cover"
                                src={item.image[0]}
                                alt={item.name}
                            />
                            <div className="text-sm">
                                <p className="font-medium text-base sm:text-lg">
                                    {item.name}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-700">
                                    <p className="text-lg font-semibold">
                                        {currency}{item.price}
                                    </p>
                                    <p>Quantity: 1</p>
                                    <p>Size: M</p>
                                </div>
                                <p className="mt-1">
                                    Date: <span className="text-gray-500">25, Jul, 2024</span>
                                </p>
                                <p className="mt-1">
                                    Payment: <span className="text-gray-500">COD</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center justify-between sm:justify-end gap-12 sm:gap-[200px] w-full sm:w-auto">

                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <p className="text-sm sm:text-base">Ready to Ship</p>
                            </div>
                            <button className="border px-4 py-2 text-sm font-medium border-gray-300">
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;
