import React from 'react';
import { Button } from 'flowbite-react';
import { DollarSign, Filter, Info, InfoIcon } from 'lucide-react';
import { MenuItemFilters } from './components/MenuItemFilters';
import { FaCartArrowDown } from 'react-icons/fa6';
import { Label, Select } from 'flowbite-react';
import { Tooltip, Typography } from "@material-tailwind/react";
import { productsMockData } from '../../../dashboard/pages/mock/productsMockData';


const menuItems = productsMockData.map(product => ({
  id: product.id,
  imageSrc: product.productImage,
  itemName: product.productName,
  price: product.price,
  sizes: product.sizes,
  addOns: product.addons,
  ingredients: product.ingredients,
}));

const MenuItem = ({ imageSrc, itemName, price, sizes, addOns, ingredients }) => (

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
        <p className="text-gray-800 flex items-center dark:text-white text-xl font-medium mb-2">
          <DollarSign className='w-5 h-5' />{price}
        </p>
      </div>
      {/* TODO: Change Sizes and AddOns to a dropdown */}
      {/* TODO: Add Title to this */}


      {/* TODO: Since addons can be multiple might as well separate them? and only add the add addons when already in the cart or the user can click any addons they can add and is added to the total price */}
      {/* TODO: Fix the card spacing */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="sizes" value="Select Size" />
        </div>
        <Select id="sizes">
          <option value="" selected disabled hidden>Select a size</option>
          {sizes.map((size, index) => <option key={index} value={size}>{size}</option>)}
        </Select>

        <div className="mb-2 block">
          <Label htmlFor="addOns" value="Select Addons" />
        </div>
        <Select id="addOns">
          <option value="" selected disabled hidden>Select an add-on</option>
          {addOns.map((addOn, index) => <option key={index} value={addOn}>{addOn}</option>)}
          <option>No Addons</option>
        </Select>
      </div>

      <div className=' flex pt-4'>
        <Label htmlFor="addOns" value="Ingredients" className='pr-2' />
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
          <InfoIcon className='w-5 h-5' />
        </Tooltip>
      </div>
    </div>
  </div>
);

export const MenuPage = () => {
  return (
    <div>
      <section className="container mx-auto px-6 p-10">
        {/* TODO: Upon clicking the cart ask for the quantity */}
        <h2 className="text-3xl font-bold text-center dark:text-white mb-8">Menu</h2>
        {/* TODO: Data for categories will be fetched */}

        <div className='flex items-center'>
          <MenuItemFilters />


        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              itemName={item.itemName}
              price={item.price}
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

