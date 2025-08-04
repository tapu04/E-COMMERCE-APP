import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Order from './pages/Order';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <div className='px-4 sm:px-[5w] md:px-[7w] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/order' element={<Order />} />
        <Route path='/product' element={<Product />} />
        <Route path='/placeOrder' element={<PlaceOrder />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

      </Routes>
    </div>
  )
}

export default App