import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [price, setPrice] = useState("");
    const [sizes, setSizes] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("price", price);
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("bestSeller", bestSeller);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setCategory("Men");
                setSubCategory("Topwear");
                setPrice("");
                setSizes([]);
                setBestSeller(false);
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>

                <div className='flex gap-2' >
                    <label htmlFor="Image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="Image1" hidden />
                    </label>
                    <label htmlFor="Image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="Image2" hidden />
                    </label>
                    <label htmlFor="Image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="Image3" hidden />
                    </label>
                    <label htmlFor="Image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="Image4" hidden />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter product name' required />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter product description' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='price' />
                </div>
            </div>


            <div>
                <p className='mb-2' >Product Sizes</p>
                <div className='flex gap-3'>
                    <p onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(size => size !== "S") : [...prev, "S"])} className={` px-3 py-1 cursor-pointer ${sizes.includes("S") ? "bg-blue-500 text-white" : "bg-slate-200"}`} >S</p>
                    <p onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(size => size !== "M") : [...prev, "M"])} className={` px-3 py-1 cursor-pointer ${sizes.includes("M") ? "bg-blue-500 text-white" : "bg-slate-200"}`} >M</p>
                    <p onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(size => size !== "L") : [...prev, "L"])} className={` px-3 py-1 cursor-pointer ${sizes.includes("L") ? "bg-blue-500 text-white" : "bg-slate-200"}`} >L</p>
                    <p onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(size => size !== "XL") : [...prev, "XL"])} className={` px-3 py-1 cursor-pointer ${sizes.includes("XL") ? "bg-blue-500 text-white" : "bg-slate-200"}`} >XL</p>
                    <p onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(size => size !== "XXL") : [...prev, "XXL"])} className={` px-3 py-1 cursor-pointer ${sizes.includes("XXL") ? "bg-blue-500 text-white" : "bg-slate-200"}`} >XXL</p>
                </div>
            </div>

            <div className='flex gap-2 mt-2' >
                <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id="bestSeller" />
                <label className='cursor-pointer' htmlFor="bestSeller">Add to bestseller</label>
            </div>

            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

        </form>
    )
}

export default Add