import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";


//global variable
const currency = 'usd';
const deliveryCharge = 10;


//gateway initialise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});



//placing order using cod
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//placing order using stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({

            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//verify stripe
const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body;

        // We don't need to retrieve the Stripe session here
        // The orderId is the MongoDB order ID, not a Stripe session ID

        if (success === "true") {
            // Update payment status to true for the order
            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            // Clear the user's cart after successful payment
            if (userId) {
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
            }

            res.json({ success: true });
        } else {
            // If payment failed, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//placing order using razorpay
const placeOrderRazorpay = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "RazorPay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
            notes: {
                order_id: newOrder._id.toString(),
                user_id: userId
            }
        };

        try {
            const razorpayOrder = await razorpayInstance.orders.create(options);
            res.json({ success: true, order: razorpayOrder });
        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: error.message });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}
//verify razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_payment_id, orderId } = req.body;

        console.log("Verification payload:", req.body);

        if (!razorpay_payment_id) {
            return res.json({ success: false, message: "Payment ID is missing" });
        }

        const orderInfo = await razorpayInstance.payments.fetch(razorpay_payment_id);
        console.log("Razorpay payment info:", orderInfo);

        if (orderInfo.status === "captured" || orderInfo.status === "authorized" || orderInfo.status === "paid") {
            // If orderId is provided directly, use it, otherwise use receipt from orderInfo
            const mongoOrderId = orderId || orderInfo.receipt || orderInfo.notes?.order_id;

            if (!mongoOrderId) {
                return res.json({ success: false, message: "Order ID could not be determined" });
            }

            await orderModel.findByIdAndUpdate(mongoOrderId, { payment: true });

            if (userId) {
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
            }

            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Payment Failed or Not Completed" });
        }
    } catch (error) {
        console.log("Razorpay verification error:", error);
        res.json({ success: false, message: error.message });
    }
};

//All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//User order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//update order status from admin panel
const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


export { verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };