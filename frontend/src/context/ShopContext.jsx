import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10; // Changed from string to number
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const adminUrl = import.meta.env.VITE_ADMIN_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {
        let cartData = { ...cartItems };

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        if (!cartItems || typeof cartItems !== 'object') {
            return totalCount;
        }

        try {
            for (const items in cartItems) {
                if (cartItems[items] && typeof cartItems[items] === 'object') {
                    for (const item in cartItems[items]) {
                        if (cartItems[items][item] > 0) {
                            totalCount += cartItems[items][item];
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error calculating cart count:", error);
        }

        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        // Check if item exists
        if (!cartData[itemId]) {
            console.error(`Item with ID ${itemId} not found in cart`);
            return;
        }

        cartData[itemId][size] = quantity;

        // Remove item if quantity is 0 or less
        if (quantity <= 0) {
            delete cartData[itemId][size];

            // Remove the item entry if no sizes left
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);
        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => (product._id === items));
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {

        try {

            const response = await axios.get(backendUrl + '/api/product/list')

            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    // Helper function to decode JWT token and extract user ID
    const decodeToken = (token) => {
        try {
            // JWT tokens are in the format: header.payload.signature
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const savedToken = localStorage.getItem('token');
            setToken(savedToken);
            getUserCart(savedToken);

            // Decode token to get user ID
            const decodedToken = decodeToken(savedToken);
            if (decodedToken && decodedToken.id) {
                setUserId(decodedToken.id);
            }
        }
    }, [])

    // Add an effect that runs when token changes to fetch cart data
    useEffect(() => {
        if (token) {
            getUserCart(token);

            // Decode token to get user ID
            const decodedToken = decodeToken(token);
            if (decodedToken && decodedToken.id) {
                setUserId(decodedToken.id);
            }
        }
    }, [token])

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken, userId, adminUrl
    }

    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
