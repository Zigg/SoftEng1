import React from 'react';
import { useParams } from 'react-router-dom';
import { productsMockData } from '../../../dashboard/pages/mock/productsMockData';
import { Label, Select } from 'flowbite-react';
import { Tooltip, Typography } from "@material-tailwind/react";
import { DollarSign, Eye, EyeOffIcon, Filter, Info, InfoIcon } from 'lucide-react';

// TODO: Create the routes for the product page
// TODO: Create the API Endpoint
// TODO: Replace the mock data with the API Endpoint, and test it, test build for now
export const MenuItemProductPage = () => {
  const { id } = useParams();
  console.log('Product ID:', id);
  const selectedItem = productsMockData.find(item => item.id === parseInt(id, 10));

  if (!selectedItem) {
    return <div>Product not found.</div>;
  }

  return (
    // TODO: Style this to look like product card
    <div>
      <h2>{selectedItem.productName}</h2>
      <p>Category: {selectedItem.category}</p>
      <p>Base Price: ${selectedItem.basePrice}</p>

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
                  <div className='font-semibold'>{selectedItem.ingredients.join(', ')}</div>
                </p>
              </Typography>
            </div>
          }
        >
          <Eye className='w-5 h-5 hover:text-blue-600 cursor-pointer' />
        </Tooltip>
      </div>

      <div className="mb-2 block">
        <Label htmlFor="sizes" value="Select Size" />
      </div>
      <Select id="sizes" defaultValue="">
        <option value="" disabled hidden>Select a size</option>
        {selectedItem.sizes.map((size, index) => (
          <option key={index} value={size.name}>
            {size.name} - ${size.price}
          </option>
        ))}
      </Select>

      <Select id="addOns" defaultValue="">
        <option value="" disabled hidden>Select an add-on</option>

        {selectedItem.addons.map((addon, index) => (
          <option key={index} value={addon.name}>
            {addon.name} - ${addon.price}
          </option>
        ))}
        <option>No Addons</option>
      </Select>

      <img
        src={selectedItem.productImage}
        alt={selectedItem.productName}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};
