import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { productsMockData } from '../../../dashboard/pages/mock/productsMockData';
import { Label, Select } from 'flowbite-react';
import { Tooltip, Typography } from "@material-tailwind/react";
import { Eye, Minus, Plus, Search, SearchX } from 'lucide-react';

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
  const { id } = useParams();
  const selectedItem = productsMockData.find(item => item.id === parseInt(id, 10));
  // TODO: Add better styling to this page
  if (!selectedItem) {
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

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [quantity, selectedSize, selectedAddOn, selectedItem]);

  function calculateTotalPrice() {
    const selectedSizePrice = selectedSize ? selectedItem.sizes.find(size => size.name === selectedSize)?.price || 0 : 0;
    const selectedAddOnPrice = selectedAddOn ? selectedItem.addons.find(addon => addon.name === selectedAddOn)?.price || 0 : 0;

    const rawTotal = (selectedItem.basePrice + selectedSizePrice + selectedAddOnPrice) * quantity;

    // Check if rawTotal is a valid number
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
  };

  const handleAddOnChange = (e) => {
    setSelectedAddOn(e.target.value);
  };



  return (
    <div className="container mx-auto px-6 p-10">
      <h2 className="text-3xl font-bold text-center dark:text-white mb-8">{selectedItem.productName}</h2>

      <div className="flex justify-center">
        <img
          src={selectedItem.productImage}
          alt={selectedItem.productName}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
            width: "50%",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="mt-8">
        <p className="text-lg font-semibold">Base Price: ${selectedItem.basePrice}</p>

        <div className='flex items-center pt-4'>
          <Label htmlFor="addOns" value="Ingredients" className='pr-2 flex flex-col items-center justify-center' />
          <Tooltip
            content={
              <div className="w-80">
                <Typography color="white" className="font-medium">
                  Ingredients Full List
                </Typography>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal opacity-80"
                >
                  <p className='pt-2' >
                    <div className='font-semibold'>{selectedItem.ingredients.join(', ')}</div>
                  </p>
                </Typography>
              </div>
            }
          >
            <Eye className='w-5 h-5 hover:text-blue-600 cursor-pointer' />
          </Tooltip>
        </div>

        <div className="mt-4">
          <span className="text-lg font-semibold">Choices</span>

          <div className="mb-2 block">
            <Label htmlFor="sizes" value="Select Size" />
          </div>
          <Select id="sizes" defaultValue="" onChange={handleSizeChange}>
            <option value="" disabled hidden>Select a size</option>
            {selectedItem.sizes.map((size, index) => (
              <option key={index} value={size.name}>
                {size.name} - ${size.price}
              </option>
            ))}
          </Select>

          <div className="mb-2 block">
            <Label htmlFor="addOns" value="Select Addon" />
          </div>
          <Select id="addOns" defaultValue="" onChange={handleAddOnChange}>
            <option value="" disabled hidden>Select an add-on</option>

            {selectedItem.addons.map((addon, index) => (
              <option key={index} value={addon.name}>
                {addon.name} - ${addon.price}
              </option>
            ))}
            <option>No Addons Available</option>
          </Select>
        </div>
      </div>
      {/* TODO: Style this better */}
      {/* TODO: Add the "add to cart" functionality */}
      <div className="flex flex-col justify-between mt-8">
        <button className="max-w-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>

        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center">
            <button onClick={decrementQuantity} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded">
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-2 text-lg font-semibold">{quantity}</span>
            <button onClick={incrementQuantity} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className=""> Total: $
          <AnimatedNumber key={quantity} value={totalPrice.toFixed(2)} commas />
        </div>

        <div className=""> Total: $
          {totalPrice.toFixed(2)}
        </div>

      </div>
    </div>
  );
};
