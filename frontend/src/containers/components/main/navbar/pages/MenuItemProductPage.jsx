import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { productsMockData } from '../../../dashboard/pages/mock/productsMockData';
import { Label, Select } from 'flowbite-react';
import { Dessert, Eye, Heart, Minus, Plus, Search, SearchX, Star } from 'lucide-react';
import { IoMdStar } from "react-icons/io";
import { GiWrappedSweet } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../../context/actions/cartAction';
import toast, { Toaster } from 'react-hot-toast';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { FaStarOfLife } from 'react-icons/fa6';


// TODO: This is correct now its adding the sizes and addons option to the base price which is correct however my products data is defined to provide the overall value not the added value to the base price. So I need to change the data to reflect the added value to the base price instead of the overall value.


const AnimatedNumber = ({ value, commas }) => {
  // TODO: The animation should start at the previous value, not 0 fix the quantity change which is causing this issue
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    let animationFrame;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = easeInOut(progress, animatedValue, value - animatedValue);

      setAnimatedValue(newValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  const easeInOut = (t, b, c) => {
    t /= 0.5;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  return (
    <span>
      {commas ? Math.abs(animatedValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Math.abs(animatedValue).toFixed(2)}
    </span>
  );
};



export const MenuItemProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const searchedItem = productsMockData.find(item => item.id === parseInt(id, 10));
  const cartItems = useSelector((state) => state.cart.items);


  console.log("cartItems:", cartItems)
  console.log("searchedItem:", searchedItem)
  // TODO: Add better styling to this page
  if (!searchedItem) {
    return (
      <div className="flex flex-col items-center justify-center h-screen pb-60">
        <div className='text-3xl font-semibold flex items-center '>
          <SearchX className='w-10 h-10 mx-5' /> Product not found.
        </div>
      </div>
    )
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedAddOn, setSelectedAddOn] = useState('');
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());
  const [productIdentifier, setProductIdentifier] = useState('');
  const overallPrice = totalPrice * quantity;
  console.log("productIdentifier:", productIdentifier)
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedSize, selectedAddOn, searchedItem]);


  function calculateTotalPrice() {
    const selectedSizePrice = selectedSize ? searchedItem.sizes.find((size) => size.name === selectedSize)?.price || 0 : 0;
    const selectedAddOnPrice = selectedAddOn
      ? searchedItem.addons.find((addon) => addon.name === selectedAddOn)?.price || 0
      : 0;

    const rawTotal = (searchedItem.basePrice + selectedSizePrice + selectedAddOnPrice);

    return isNaN(rawTotal) ? 0 : rawTotal;
  }

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    updateProductIdentifier(e.target.value, selectedAddOn);
  };

  const handleAddOnChange = (e) => {
    setSelectedAddOn(e.target.value);
    updateProductIdentifier(selectedSize, e.target.value);
  };

  const updateProductIdentifier = (size, addon) => {
    const updatedProductIdentifier = `${searchedItem.id}_${size || 'no_size'}_${addon || 'no_addon'}`;
    setProductIdentifier(updatedProductIdentifier);
  };


  const handleAddCartItem = () => {
    // TODO: Add better validation,
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    // if (!selectedAddOn) {

    //   return
    // }

    const options = {
      size: selectedSize,
      addons: selectedAddOn,
      totalPrice: totalPrice,
    };

    const productToAdd = {
      id: searchedItem.id,
      name: searchedItem.productName,
      image: searchedItem.productImage,
      quantity,
      options,
      productIdentifier,
    };

    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={searchedItem.productImage}
                alt={searchedItem.productName}
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Added {searchedItem.productName} to your cart.
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {quantity} x {selectedSize} {searchedItem.productName}  {selectedAddOn}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))

    dispatch(addToCart(productToAdd));

    // TODO: 
    // setSelectedSize('');
    // setSelectedAddOn('');
    setQuantity(1);
  };

  return (
    <div className="mx-auto pt-12 flex items-center justify-center">
      <div className='grid xl:grid-cols-2'>
        {/* Product Card */}
        <div className=" max-w-[26rem] h-full m-8">
          {/* Card Header */}
          <div className="relative rounded-lg">
            <div className="relative">
              {/* <span className='flex flex-col items-center justify-center'>{searchedItem.productName}</span> */}

              <div className="flex items-center justify-center ">
                <img
                  src={searchedItem.productImage}
                  alt={searchedItem.productName}
                  className=" max-h-[28rem] object-cover  rounded-lg w-full"
                />
              </div>
            </div>
            <button className='right-0'>
              {/* <Heart className='w-5 h-5' /> */}
            </button>
          </div>

          {/* Card Body */}
          <CardBody>
            <div className="mb-3 flex flex-col  items-center justify-between">
              {/* <Typography variant="h5" color="blue-gray" className="font-medium mb-4">
                {searchedItem.productName}
              </Typography> */}
            </div>
            <Typography color="gray">
              {/* TODO: Add short description for the product limit it to 255 characters in the admin dashboard and add product page */}
              <div className='flex flex-col'>
                <span className='text-xs'>Placeholder:</span>

                <span className='font-bold'>Product Description:</span>
                <span>Duis non dolor irure nulla eu voluptate tempor tempor id aliquip in reprehenderit qui.</span>
                {searchedItem.productDescription}
              </div>
            </Typography>

            {/* TODO: Placeholder */}
            {/* TODO: Add a taste profile field to the json, /database later on */}
            {/* <div className='flex flex-col'>Taste Profile:
              <span className='text-xs'>Placeholder:</span>
              <div className='flex gap-x-2'><Dessert className='h-6 w-6' /><GiWrappedSweet className='h-6 w-6' /></div>
            </div> */}
          </CardBody>
        </div>

        <div className="ml-8 px-12 mx-12 max-w-md">
          <h2 className="text-xl border-b-2 border-slate-300 font-bold text-center dark:text-white mb-4 ">{searchedItem.productName} Details</h2>
          <p className="font-bold">Base Price: ${searchedItem.basePrice}</p>

          <div className="mt-4">
            <span className=" font-semibold mb-4 block border-b-2 border-slate-300">Variation</span>

            {/* Select Size Dropdown */}
            <div className="mb-4 ">
              <Label value="Select Size" />
              <div className="flex flex-col">
                {searchedItem.sizes.map((size, index) => (
                  <div key={index} className="mr-2 mb-4">
                    <input
                      type="radio"
                      id={`size-${index}`}
                      name="selectedSize"
                      value={size.name}
                      onChange={handleSizeChange}
                    />
                    <Label htmlFor={`size-${index}`} className="ml-2">
                      {size.name} (+${size.price})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Add-On Radio Buttons */}
            <div className="mb-4">
              <Label value="Select Addons" />
              <div className="flex flex-col">
                {searchedItem.addons.length > 0 ? (
                  searchedItem.addons.map((addon, index) => (
                    <div key={index} className="mr-2 mb-4">
                      <input
                        type="radio"
                        id={`addon-${index}`}
                        name="selectedAddon"
                        value={addon.name}
                        onChange={handleAddOnChange}
                      />
                      <Label htmlFor={`addon-${index}`} className="ml-2">
                        {addon.name} (+${addon.price})
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className='text-red-600'>No Addons Available</p>
                )}
              </div>
            </div>


            {/* Ingredients */}
            <div className='flex items-center mb-4'>
              <Label htmlFor="addOns" value="Ingredients" className='pr-2 flex flex-col items-center justify-center' />
              <Tooltip
                content={
                  <div className="w-80">
                    <Typography color="white" className="font-medium">
                      Ingredients Full List
                    </Typography>
                    <Typography variant="small" color="white" className="font-normal opacity-80">
                      <p className='pt-2'>
                        <div className='font-semibold'>{searchedItem.ingredients.join(', ')}</div>
                      </p>
                    </Typography>
                  </div>
                }
              >
                <Eye className='w-5 h-5 hover:text-blue-600 cursor-pointer' />
              </Tooltip>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col  mb-4 justify-between">
              <div className="flex items-center gap-2">
                <span className="mr-2">Quantity:</span>
                <button
                  onClick={decrementQuantity}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="mx-2 font-semibold">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Checkout/Cart */}
              <div className="flex gap-x-2 mt-4 items-center">
                <button
                  onClick={handleAddCartItem}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm flex-shrink-0"
                >
                  Add to Cart
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm flex-shrink-0"
                >
                  Order Now
                </button>
              </div>
            </div>


            {/* Total Price */}
            <div className="mt-4 pb-16 flex">
              <div className="font-semibold text-sm"> Total (per item): $
                {totalPrice.toFixed(2)}
              </div>
              {/* <div className="font-semibold text-sm"> Total (overall): $
                <AnimatedNumber key={quantity} value={overallPrice.toFixed(2)} commas />
              </div> */}
            </div>
            {/* <div className="text-sm text-gray-500">Free shipping on orders over $50 </div>

            <span className='text-xs text-gray-500 italic'>Terms and Conditions apply</span> */}
          </div>
        </div>

      </div>
    </div >
  );
};
