import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl, userId } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            // Send userId along with the request to properly update the user's cart
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {
                success,
                orderId,
                userId
            }, { headers: { token } })

            if (response.data.success) {
                toast.success("Payment successful!");
                setCartItems({});
                navigate('/order');
            } else {
                toast.error("Payment verification failed");
                navigate('/cart');
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token])

    return (
        <div>Verify</div>
    )
}

export default Verify