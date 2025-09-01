import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const formatPrice = (amount) => {
        // Use USD instead of INR since the currency in ShopContext is set to "$"
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const subtotal = Number(getCartAmount());   // ensure number
    const shipping = subtotal === 0 ? 0 : Number(delivery_fee);
    const total = subtotal + shipping;

    return (
        <div className='w-full' >
            <div className='text-2xl' >
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm' >
                <div className='flex justify-between' >
                    <p>Subtotal</p>
                    <p>{formatPrice(subtotal)}</p>
                </div>
                <hr className='border-gray-200' />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{formatPrice(shipping)}</p>
                </div>
                <hr className='border-gray-200' />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{formatPrice(total)}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal