import { Filter } from 'lucide-react';
import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

// TODO: Fetch these from the database
const categories = ['Burgers', 'Pizza', 'Pasta', 'Sushi', 'Steak', 'Tacos', 'Desserts', 'Salads', 'Beverages', 'Burritos', 'Sandwiches', 'Breakfast', 'Seafood', 'Appetizers', 'Fastfood', 'Others'];

const addons = ['With Addons', 'Without Addons'];

const sizes = ['Small', 'Regular', 'Large', 'Custom Size'];

// TODO: Add the horizontal scrollbar if it gets to big

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
                <option value="" disabled>Select a cuisine</option>
                {categories.map((category) => (
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
                {addons.map((addon) => (
                  <option key={addon} value={addon}>{addon}</option>
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
                {sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  )
}
