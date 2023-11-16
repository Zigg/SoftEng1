import React from 'react';
import { Button } from 'flowbite-react';
import { DollarSign, Eye, EyeOffIcon, Filter, Info, InfoIcon } from 'lucide-react';
import { MenuItemFilters } from './components/MenuItemFilters';
import { FaCartArrowDown } from 'react-icons/fa6';
import { Label, Select } from 'flowbite-react';
import { Tooltip, Typography } from "@material-tailwind/react";
import { productsMockData } from '../../../dashboard/pages/mock/productsMockData';


const menuItems = productsMockData.map(product => ({
  id: product.id,
  imageSrc: product.productImage,
  itemName: product.productName,
  basePrice: product.basePrice,
  sizes: product.sizes,
  addOns: product.addons,
  ingredients: product.ingredients,
}));


const MenuItem = ({ imageSrc, itemName, basePrice, sizes, addOns, ingredients }) => (
  <div className="relative overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
    {Array.isArray(imageSrc) ? imageSrc.map((src, index) => (
      <img
        key={index}
        alt={itemName}
        className="w-full h-56 object-cover transform transition-transform duration-200 hover:scale-105"
        height="200"
        src={src}
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
    )) : <img
      alt={itemName}
      className="w-full h-56 object-cover transform transition-transform duration-200 hover:scale-105"
      height="200"
      src={imageSrc}
      style={{
        aspectRatio: "200/200",
        objectFit: "cover",
      }}
      width="200"
    />}

    <Button color="gray" className="absolute top-0 right-0 m-2" >
      <FaCartArrowDown className='w-4 h-4' />
    </Button>
    <div className="bg-white dark:bg-gray-800 w-full p-4 flex flex-col ">
      <div className='flex justify-between'>
        <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">{itemName}</p>
        {/* <p className="text-gray-800 flex items-center dark:text-white text-xl font-medium mb-2"> <span className='text-xs text-red-500 underline'>Starts at</span>
          <DollarSign className='w-5 h-5' /> {basePrice}
        </p> */}
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="sizes" value="Select Size" />
        </div>
        <Select id="sizes">
          <option value="" selected disabled hidden>Select a size</option>
          {sizes.map((size, index) => (
            <option key={index} value={size.name}>
              {size.name} - ${size.price}
            </option>
          ))}
        </Select>

        <div className="mb-2 flex py-2">
          <Label htmlFor="addOns" value="Select Addons" />
          <Tooltip
            content={
              <div className="w-80">
                <Typography color="white" className="font-semibold">
                  If Applicable
                </Typography>

              </div>
            }
          >
            <InfoIcon className='w-4 h-4 ml-1 text-red-500' />
          </Tooltip>
        </div>
        <Select id="addOns">

          <option value="" selected disabled hidden>Select an add-on</option>

          {addOns.map((addon, index) => (
            <option key={index} value={addon.name}>
              {addon.name} - ${addon.price}
            </option>
          ))}
          <option>No Addons</option>
        </Select>
      </div>

      {/* TODO: Should there be ingredients? */}
      <div className=' flex pt-4'>
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
                  <div className='font-semibold'>{ingredients.join(', ')}</div>
                </p>
              </Typography>
            </div>
          }
        >
          <Eye className='w-5 h-5 hover:text-blue-600' />
        </Tooltip>
      </div>

    </div>
  </div>
);


export const MenuPage = () => {
  return (
    <div>
      <section className="container mx-auto px-6 p-10">
        <h2 className="text-3xl font-bold text-center dark:text-white mb-8">Menu</h2>

        <div className='flex items-center'>
          <MenuItemFilters />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              itemName={item.itemName}
              basePrice={item.basePrice}
              sizes={item.sizes}
              addOns={item.addOns}
              imageSrc={item.imageSrc}
              ingredients={item.ingredients}
            />
          ))}
        </div>
      </section>
    </div>
  );
};


