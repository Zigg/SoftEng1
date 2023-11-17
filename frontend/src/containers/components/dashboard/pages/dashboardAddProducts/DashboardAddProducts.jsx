import React, { useState, useEffect, useCallback } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from 'flowbite-react';
import {
  ChefHat,
  CircleDollarSign,
  CloudCog,
  DollarSign,
  Plus,
  PlusCircle,
  RefreshCcw,
  Save,
  UploadCloudIcon,
  Utensils,
  UtensilsCrossed,
  X,
} from 'lucide-react';

import { useDropzone } from 'react-dropzone';
import Switch from 'react-switch';
import { useForm, Controller, useWatch } from 'react-hook-form';
const categories = [
  'Burgers',
  'Pizza',
  'Pasta',
  'Sushi',
  'Steak',
  'Tacos',
  'Desserts',
  'Salads',
  'Beverages',
  'Burritos',
  'Sandwiches',
  'Breakfast',
  'Seafood',
  'Appetizers',
  'Fast Food',
  'Others',
];

export const DashboardAddProducts = (formData, fields, labels) => {


  const { control, handleSubmit, register, setValue, getValues, watch, reset, formState: { errors },
  } = useForm();

  const [addons, setAddons] = useState([]);

  const [currentAddon, setCurrentAddon] = useState({
    addonName: '',
    addonPrice: '',
  });

  const handleAddAddon = () => {
    if (
      currentAddon.addonName.trim() !== '' &&
      currentAddon.addonPrice.trim() !== ''
    ) {
      setAddons([...addons, currentAddon]);
      setCurrentAddon({ addonName: '', addonPrice: '' });
    }
    console.log('add action: addons:', addons);
  };

  const handleRemoveAddon = (index) => {
    const newAddons = [...addons];
    newAddons.splice(index, 1);
    setAddons(newAddons);
    console.log('remove action: newAddons:', newAddons);
  };
  // FIXME: Addons is not off when clearing form
  // TODO: Fix Ingredients and Addons, Images, not clearing when clearing form
  const handleClearForm = () => {
    reset({
      productName: '',
      category: '',
      price: '',
      ingredients: '',
      sizes: [],
      smallPrice: '',
      regularPrice: '',
      largePrice: '',
      customSizeName: '',
      customSizePrice: '',
      noAddons: true,
      addonName: '',
      addonPrice: '',
      isVisible: false,
      isFeatured: false,
      images: [],
      selectedImages: [],
      // TODO: Add other fields if needed
    });
  };
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');

  const [selectedImages, setSelectedImages] = useState([]);

  // const customSizes = useWatch({ control, name: 'customSizes', defaultValue: [] });
  const selectedSizes = useWatch({ control, name: 'sizes', defaultValue: [] });
  const hasNoAddons = useWatch({ control, name: 'noAddons', defaultValue: true });
  const isVisible = useWatch({ control, name: 'isVisible', defaultValue: false });
  const isFeatured = useWatch({ control, name: 'isFeatured', defaultValue: false });
  const images = useWatch({ control, name: 'images', defaultValue: [] });

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = [...selectedImages, ...acceptedFiles];

    setValue('images', newImages);

    setSelectedImages(newImages);
  }, [selectedImages, setValue]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/',
    multiple: true,
    onDrop,
  });


  const handleAddIngredient = () => {
    const currentIngredientsValue = watch('ingredients');

    // Check if the input field is empty
    if (!currentIngredientsValue.trim()) {
      setIngredientsError('Please enter an ingredient.');
      return;
    }

    // Add the current input to the ingredients array
    setIngredients([...ingredients, currentIngredientsValue.trim()]);

    // Clear the input field
    setValue('ingredients', '');

    // Reset the error message
    setIngredientsError('');
  };

  const handleIngredientChange = (e) => {
    setCurrentIngredients(e.target.value);
  };

  const handleIngredientKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
    console.log('handleIngredientKeyPress: ingredients:', e.key === 'Enter');
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);

    // Update the form state after removing an ingredient
    setValue('ingredients', updatedIngredients);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const imageArray = Array.from(files);
      setSelectedImages([...selectedImages, ...imageArray]);
    }
  };
  useEffect(() => {
    console.log('handleImageChange: selectedImages:', selectedImages);
  }, [selectedImages]);

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    console.log('remove action: updatedImages:', updatedImages);
  };


  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Add your logic to handle form submission
  };

  return (
    <form className='grid flex-shrink-0 grid-cols-2 p-8 bg-blue-100 border-4  sm:grid-cols-1 gap-x-6 gap-y-8 max-w-3xl items-center justify-self-center overflow-x-auto shadow-md sm:rounded-lg' onSubmit={handleSubmit(onSubmit)}>

      {/* ... other fields ... */}

      {/* Product Name */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="productName" value="Product Name" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <TextInput
          id="productName"
          placeholder="Product Name"
          addon={<ChefHat className="w-4 h-4" />}
          {...register('productName', { required: true })}
          className="w-full p-2   rounded-md"
        />
      </div>

      {/* Select Category */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="category" className="text-sm " value="Select your category" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <select {...register('category', { required: true })} className="w-full p-2 border  rounded-md">
          <option value="">Select food category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="price" value="Base Price" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <TextInput
          id="price"
          type="text"
          addon={<CircleDollarSign className="w-4 h-4" />}
          placeholder="Price"
          {...register('price', { required: true, pattern: /^[0-9]*$/ })}
          className="w-full p-2   rounded-md"
        />
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label htmlFor="ingredients" className="text-md">
          Ingredients
        </label>
        <input
          id="ingredients"
          placeholder="List of ingredients"
          {...register('ingredients')}
          className={`w-full p-2 ${ingredientsError ? 'border-red-500' : ''} rounded-md`}
        />
        {ingredientsError && (
          <p className="text-sm font-semibold text-red-600 mt-2">{ingredientsError}</p>
        )}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleAddIngredient}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Ingredient
          </button>
        </div>
        {ingredients.length > 0 && (
          <div className="overflow-x-auto whitespace-nowrap mt-4">
            <div className="flex flex-nowrap max-w-[30px]">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-1 m-1 text-xs font-semibold rounded-full bg-slate-300"
                >
                  {ingredient}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    <X className="w-3 h-3 rounded-full text-red-500 hover:bg-red-600 hover:text-white" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="sizes" className="text-lg font-bold" value="Sizes" />
        </div>

        <div>
          {['small', 'regular', 'large', 'custom'].map((size) => (
            <React.Fragment key={size}>
              <div className="flex items-center mb-2">
                <Checkbox {...register('sizes', { required: true })} value={size} className="mr-2" />
                <label htmlFor={size} className="text-md">{size.charAt(0).toUpperCase() + size.slice(1)}</label>
              </div>

              {/* Conditional fields based on selected sizes */}
              {selectedSizes.includes(size) && (
                <div className="mb-2">
                  <Label htmlFor={`${size}Price`} className="text-md" value={`${size.charAt(0).toUpperCase() + size.slice(1)} Size Price`} />
                  <TextInput
                    id={`${size}Price`}
                    placeholder={`${size.charAt(0).toUpperCase() + size.slice(1)} Size Price`}
                    {...register(`${size}Price`, { required: true, pattern: /^[0-9]*$/ })}
                    className="w-full p-2 rounded-md"
                  />
                </div>
              )}

              {/* Conditional fields for custom size */}
              {size === 'custom' && selectedSizes.includes('custom') && (
                <div className="mb-2">
                  <Label htmlFor="customSizeName" className="text-md" value="Custom Size Name" />
                  <TextInput
                    id="customSizeName"
                    placeholder="Custom Size Name"
                    {...register('customSizeName', { required: true })}
                    className="w-full p-2 rounded-md"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const customSizeName = watch('customSizeName');
                      const customSizePrice = watch('customSizePrice');
                      if (customSizeName && customSizePrice) {
                        setCustomSizes((prevSizes) => [...prevSizes, customSizeName]);
                        setValue('customSizeName', '');
                        setValue('customSizePrice', '');
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add Custom Sizing
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>


      {/* Addons */}
      <div className="mb-4">
        <div className="block mb-2">
          <label htmlFor="noAddons" className="text-lg font-bold">No Addons</label>
        </div>

        <div className="flex items-center mb-2">
          <Checkbox type="checkbox" id="noAddons" {...register('noAddons')} defaultChecked className="mr-2" />
          <label htmlFor="noAddons" className="text-md">No Addons</label>
        </div>

        {/* Conditional fields based on noAddons checkbox */}
        {!hasNoAddons && (
          <div className="mb-2">
            <label htmlFor="addonName" className="text-md">Addon Name</label>
            <input
              id="addonName"
              placeholder="Addon Name"
              {...register('addonName', { required: true })}
              value={currentAddon.addonName}
              onChange={(e) => setCurrentAddon({ ...currentAddon, addonName: e.target.value })}
              className="w-full p-2 rounded-md"
            />

            <label htmlFor="addonPrice" className="text-md">Addon Price</label>
            <input
              id="addonPrice"
              placeholder="Addon Price"
              {...register('addonPrice', { required: true, pattern: /^[0-9]*$/ })}
              value={currentAddon.addonPrice}
              onChange={(e) => setCurrentAddon({ ...currentAddon, addonPrice: e.target.value })}
              className="w-full p-2 rounded-md"
            />

            {/* Button for Add Addons */}
            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={handleAddAddon}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Addons
              </button>
            </div>

            {/* Display added addons */}
            <div className="overflow-x-auto whitespace-nowrap mt-4">
              <div className="flex flex-nowrap max-w-[30px]">
                {addons.map((addon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-1 m-1 text-xs font-semibold rounded-full bg-slate-300"
                  >
                    {`${addon.addonName}: ${addon.addonPrice}`}
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => handleRemoveAddon(index)}
                    >
                      <X className="w-3 h-3 rounded-full text-red-500 hover:bg-red-600 hover:text-white" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Set Visibility */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="isVisible" className="text-lg font-bold" value="Set Visibility" />
        </div>

        <Switch
          id="isVisible"
          checked={isVisible}
          onChange={(value) => setValue('isVisible', value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600  rounded"
        />
      </div>

      {/* Set Featured */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="isFeatured" className="text-lg font-bold" value="Set Featured" />
        </div>

        <Switch
          id="isFeatured"
          checked={isFeatured}
          onChange={(value) => setValue('isFeatured', value)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600  rounded"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="images" className="text-lg font-bold" value="Image Upload" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>

        <div {...getRootProps()} className="dropzone border-2 border-dashed border-gray-400 rounded-md p-4 text-center">
          <input {...getInputProps()} onChange={handleImageChange} />
          <div className='flex flex-col items-center justify-center'>
            <CloudCog className='w-32 h-16 text-blue-500' />
            {isDragActive ? (
              <p className="text-gray-600">Drop the files here...</p>
            ) : (
              <p className="text-gray-600">Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>


        {selectedImages.length === 0 && (
          <p className="text-sm font-semibold text-red-600 mt-2">
            Upload at least one image.
          </p>
        )}

        <div className="overflow-x-auto whitespace-nowrap mt-4">
          <div className="flex flex-nowrap w-full h-full">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-16 h-16 m-1">
                <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="object-cover rounded-md" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-md"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* ... other fields ... */}
      <div className="flex justify-end mr-2">
        <button
          type="button"
          onClick={handleClearForm}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Clear Form
        </button>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md mt-4"
      >
        Submit
      </button>
    </form>
  );
};


