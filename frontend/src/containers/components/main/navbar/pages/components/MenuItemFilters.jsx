import { Filter, X } from 'lucide-react';
import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import { productsMockData } from '../../../../dashboard/pages/mock/productsMockData';
import { restaurantsMockData } from '../../../../dashboard/pages/mock/restaurantsMockData';
// TODO: Fetch these from the database

// For Dynamically fetching the cuisine available
const restaurantCuisine = restaurantsMockData.map(restaurant => restaurant.cuisine);
const uniqueCuisine = [...new Set(restaurantCuisine)].sort();

// For Dynamically fetching the addonsStatus if available
// This could have been hardcoded but if we add more addons, it would be easier to fetch it dynamically, and also the addons name, prices etc
const addonsStatus = productsMockData.map(product => {
  if (product.addons && product.addons.length > 0) {
    return 'With Addons';
  } else {
    return 'Without Addons';
  }
});
const uniqueAddonsStatus = [...new Set(addonsStatus)];

// For Dynamically fetching the sizes available
// FIXME: Map is not working, as this is a nested array
const productSizes = productsMockData.flatMap(product => {
  console.log(product.sizes);
  return product.sizes.map(size => size.name);
});
const uniqueSizes = [...new Set(productSizes)];
console.log(Array.isArray(uniqueSizes), uniqueSizes);

// Do the same for these and the sizes as well
// const addons = ['With Addons', 'Without Addons'];

// const sizes = ['Small', 'Regular', 'Large', 'Custom Size'];

export const MenuItemFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAddon, setSelectedAddon] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const scrollBarWidth = 165;

  return (
    // TODO: Fetch the categories, addons, sizes, etc
    <>
      <span className='mb-4 text-sm font-semibold'>Filters</span>
      <div className='flex'>
        <div className='h-20'>
          <Scrollbars style={{ width: scrollBarWidth, height: 80 }}>
            <div className="py-4 px-3 text-xs md:w-1/2 lg:w-1/3 xl:w-1/4">
              <select
                className={`rounded-3xl hover:bg-gray-100 cursor-pointer  text-xs border-gray-300 px-2  ${selectedCategory !== '' ? 'text-blue-500' : ''}`}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>Select a category</option>
                {uniqueCuisine.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </Scrollbars>
        </div>

        <div className='h-20'>
          <Scrollbars style={{ width: scrollBarWidth, height: 80 }}>
            <div className="py-4 px-3 text-xs md:w-1/2 lg:w-1/3 xl:w-1/4">
              <select
                className={`rounded-3xl hover:bg-gray-100 cursor-pointer text-xs border-gray-300 px-2  ${selectedAddon !== '' ? 'text-blue-500' : ''}`}
                value={selectedAddon}
                onChange={(e) => setSelectedAddon(e.target.value)}
              >
                <option value="" disabled>Select an Addon</option>
                {uniqueAddonsStatus.map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </Scrollbars>
        </div>

        <div className='h-20'>
          <Scrollbars style={{ width: scrollBarWidth, height: 80 }}>
            <div className="py-4 px-3 text-xs md:w-1/2 lg:w-1/3 xl:w-1/4">
              <select
                className={`rounded-3xl hover:bg-gray-100 cursor-pointer  text-xs border-gray-300 px-2  ${selectedSize !== '' ? 'text-blue-500' : ''}`}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="" disabled>Select a size</option>
                {uniqueSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </Scrollbars>
        </div>

        <button className="btn btn-circle flex items-center justify-center mb-4" onClick={() => {

          setSelectedCategory('');
          setSelectedAddon('');
          setSelectedSize('');
        }}>
          <div className='flex items-center justify-center'>
            <X className='w-6 h-6 border-2 hover:bg-red-500 hover:text-white rounded-full transform transition-transform duration-200 hover:scale-110' />
            {/* <span className='ml-2 underline-offset-4'>
              Clear Filter
            </span> */}
          </div>
        </button>
      </div>

    </>
  )
}
