import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios, { all } from "axios";

const Order = () => {
    const { backendUrl, token, currency, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) { return null; }
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
            if (response.data.success) {
                let allOrderItems = [];
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrderItems.push(item);
                    })
                })
                setOrderData(allOrderItems.reverse());
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className="border-t pt-16 border-gray-200">
            <div className="text-2xl ">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>

            <div>
                {orderData.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 border-t border-b border-gray-200 text-gray-700 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        {/* Left Section */}
                        <div onClick={() => navigate(`/products/${item._id}`)} className="flex items-start gap-4 w-full sm:w-auto cursor-pointer ">
                            <img
                                className="w-20 h-20 object-cover"
                                src={item.image[0]}

                            />
                            <div className="text-sm">
                                <p className="font-medium text-base sm:text-lg">
                                    {item.name}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-700">
                                    <p className="text-lg font-semibold">
                                        {currency}{item.price}
                                    </p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                                <p className="mt-1">
                                    Date: <span className="text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                                </p>
                                <p className="mt-1">
                                    Payment: <span className="text-gray-500">{item.paymentMethod}</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center justify-between sm:justify-end gap-12 sm:gap-[200px] w-full sm:w-auto">

                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <p className="text-sm sm:text-base">{item.status}</p>
                            </div>
                            <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium border-gray-300 cursor-pointer">
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
