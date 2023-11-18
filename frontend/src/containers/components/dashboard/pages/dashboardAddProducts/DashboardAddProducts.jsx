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
import { useForm, Controller, useWatch, useFieldArray } from 'react-hook-form';
const categories = [
  'Burgers',
  'Pizza',
  'Pasta',
  'Sushi',
  'Steak',
  'Tacos',
  'Burritos',
  'Breakfast',
  'Seafood',
  'Fast Food',
  'Italian',
  'Japanese',
  'American',
  'Mexican',
  'Dessert',
  'Salad',
  'Beverage',
  'Sandwich',
  'Appetizer',
];


export const DashboardAddProducts = () => {



  const { control, handleSubmit, register, setValue, getValues, watch, reset, formState: { errors },
  } = useForm({
    defaultValues: {
      ingredients: [{ value: '' }],
      sizes: [
        { name: 'small', price: '' },
        { name: 'regular', price: '' },
        { name: 'large', price: '' },
      ],
      noAddons: false,
      addons: [{ addonName: '', addonPrice: '' }],

    }
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control,
    name: 'sizes',
  });

  const handleRemoveSize = (index) => {
    const name = watch(`sizes.${index}.name`);

    if (name === 'custom') {
      setValue(`sizes.${index}.customSizeName`, '');
      setValue(`sizes.${index}.customSizePrice`, '');
    }

    removeSize(index);
  };


  const { fields: addonFields, append: appendAddon, remove: removeAddon } = useFieldArray({
    control,
    name: 'addons',
  });

  const handleAddAddon = () => {
    appendAddon({ addonName: '', addonPrice: '' });
  };

  const handleRemoveAddon = (index) => {
    if (addonFields.length > 1) {
      removeAddon(index);
    }
  };

  // FIXME: Addons is not off when clearing form
  // TODO: Fix Ingredients and Addons, Images, not clearing when clearing form
  const handleClearForm = () => {
    reset({
      productName: '',
      category: '',
      price: '',
      // ingredients: '',
      ingredients: [],

      sizes: '',
      smallPrice: '',
      regularPrice: '',
      largePrice: '',
      customSizeName: '',
      customSizePrice: '',
      noAddons: true,
      'addons': [],
      addonName: '',
      addonPrice: '',
      isVisible: false,
      isFeatured: false,
      images: [],
      selectedImages: [],
      // TODO: Add other fields if needed
    });
  };

  const [selectedImages, setSelectedImages] = useState([]);

  // const customSizes = useWatch({ control, name: 'customSizes', defaultValue: [] });
  // const selectedSizes = useWatch({ control, name: 'sizes', defaultValue: [] });

  const isVisible = useWatch({ control, name: 'isVisible', defaultValue: false });
  const isFeatured = useWatch({ control, name: 'isFeatured', defaultValue: false });
  const images = useWatch({ control, name: 'images', defaultValue: [] });

  const onDrop = useCallback((acceptedFiles) => {
    // Filter out non-image files
    const newImages = acceptedFiles.filter(file => file.type.startsWith('image/'));

    setValue('images', [...selectedImages, ...newImages]);
    setSelectedImages([...selectedImages, ...newImages]);
  }, [selectedImages, setValue]);



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: useCallback((acceptedFiles) => {
      // Filter out non-image files
      const newImages = acceptedFiles.filter(file => file.type.startsWith('image/'));

      if (newImages.length !== acceptedFiles.length) {
        // Non-image files were dropped, set an error
        setValue('images', newImages); // Update the images with only valid ones
        errors.images = {
          type: 'manual',
          message: 'Only images are allowed.',
        };
      } else {
        setValue('images', [...selectedImages, ...newImages]);
        setSelectedImages([...selectedImages, ...newImages]);
      }
    }, [selectedImages, setValue, errors]), // Include 'errors' in the dependencies array
  });


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
    // const filteredSizes = data.sizes.filter((size) => size.checked || size.name !== 'custom');
    // data.sizes = filteredSizes;

    console.log('Form data:', data);
    // Add your logic to handle form submission
  };

  return (
    <form className='grid flex-shrink-0 grid-cols-2 p-8 bg-blue-100 border-4  sm:grid-cols-1 gap-x-6 gap-y-8 max-w-3xl items-center justify-self-center overflow-x-auto shadow-md sm:rounded-lg' onSubmit={handleSubmit(onSubmit)}>

      {/* ... other fields ... */}

      {/* Product Name */}
      <div className="mb-4">
        <div className="block mb-2">
          <label htmlFor="productName" className="text-lg font-bold">
            Product Name
          </label>
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <input
          id="productName"
          placeholder="Product Name"
          {...register('productName', { required: true })}
          className={`w-full p-2 rounded-md ${errors.productName ? 'border-red-500 border-2' : ''}`}
        />
        {errors.productName && (
          <span className="text-red-600 text-sm">Product Name is required</span>
        )}
      </div>



      {/* Select Category */}
      <div className="mb-4">
        <div className="block mb-2">
          <Label htmlFor="category" className="text-sm" value="Select your category" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <select
          {...register('category', { required: true })}
          className={`w-full p-2 border rounded-md ${errors.category ? 'border-red-500 border-2' : ''}`}
        >
          <option selected disabled value="">
            Select food category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-600 text-sm">Please select a category</span>
        )}
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
          // addon={<CircleDollarSign className="w-4 h-4" />}
          placeholder="Price"
          {...register('price', { required: true, pattern: /^[0-9]*$/ })}
          className={`w-full rounded-md ${errors.price ? 'border-red-500 border-2 rounded-lg' : ''}`}
        />
        {errors.price && (
          <span className="text-red-600 text-sm">
            {errors.price.type === 'required'
              ? 'Base Price is a required field'
              : 'Price must be a number'}
          </span>
        )}
      </div>


      {/* Ingredients */}
      <div className="mb-4">
        <label htmlFor="ingredients" className="text-md">
          Ingredients
        </label>

        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex items-center justify-center p-1 m-1 text-xs font-semibold rounded-full bg-slate-300">
            {field.value}
            <span
              className="ml-2 cursor-pointer"
              onClick={() => removeIngredient(index)}
            >
              X
            </span>
          </div>
        ))}

        {ingredientFields.map((field, index) => (
          <input
            key={field.id}
            id={`ingredients.${index}.value`}
            name={`ingredients.${index}.value`}
            placeholder="List of ingredients"
            {...register(`ingredients.${index}.value`, { required: 'Please enter an ingredient.' })}
            defaultValue={field.value}
            className={`w-full p-2 ${errors?.ingredients?.[index]?.value ? 'border-red-500' : ''} rounded-md`}
          />
        ))}

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => appendIngredient({ value: '' })}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Ingredient
          </button>
        </div>

        {errors?.ingredients?.map((error, index) => (
          <p key={index} className="text-sm font-semibold text-red-600 mt-2">
            {error.value.message}
          </p>
        ))}
      </div>




      {/* Sizes */}
      <div>
        <label htmlFor="sizes" className="text-md">
          Sizes
        </label>
        {sizeFields.map((size, index) => (
          <div key={size.id}>
            <div className="flex items-center mb-2">
              <Checkbox
                type="checkbox"
                {...register(`sizes.${index}.checked`)}
                className="mr-2"
              />
              <label htmlFor={`sizes.${index}.checked`} className="text-md">
                {size.name.charAt(0).toUpperCase() + size.name.slice(1)}
              </label>
              {watch(`sizes.${index}.checked`) && size.name !== 'custom' && (
                <div className="ml-2">
                  <input
                    type="number"
                    {...register(`sizes.${index}.price`, { required: true, pattern: /^[0-9]*$/ })}
                    placeholder={`${size.name.charAt(0).toUpperCase() + size.name.slice(1)} Size Price`}
                    className="mr-2"
                  />
                </div>
              )}
              <span
                className="ml-2 cursor-pointer"
                onClick={() => handleRemoveSize(index)}
              >
                <X className="w-3 h-3 rounded-full text-red-500 hover:bg-red-600 hover:text-white" />
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => {
              appendSize({ name: 'custom', price: '', checked: true });
            }}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Custom Size
          </button>
        </div>

        {sizeFields.map((size, index) => (
          size.name === 'custom' && size.checked && (
            <div key={index} className="mb-2">
              <label htmlFor="customSizeName" className="text-md">
                Custom Size Name
              </label>
              <input
                id="customSizeName"
                placeholder="Custom Size Name"
                {...register(`sizes.${index}.customSizeName`, { required: true })}
                className="w-full p-2 rounded-md"
              />

              <label htmlFor="customSizePrice" className="text-md">
                Custom Size Price
              </label>
              <input
                id="customSizePrice"
                placeholder="Custom Size Price"
                {...register(`sizes.${index}.customSizePrice`, { required: true, pattern: /^[0-9]*$/ })}
                className="w-full p-2 rounded-md"
              />
            </div>
          )
        ))}
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
        {!watch('noAddons') && (
          <div className="mb-2">
            {addonFields.map((addon, index) => (
              <div key={addon.id}>
                <label htmlFor={`addons.${index}.addonName`} className="text-md">
                  Addon Name
                </label>
                <input
                  id={`addons.${index}.addonName`}
                  placeholder="Addon Name"
                  {...register(`addons.${index}.addonName`, { required: true })}
                  className="w-full p-2 rounded-md"
                />


                <label htmlFor={`addons.${index}.addonPrice`} className="text-md">
                  Addon Price
                </label>
                <input
                  id={`addons.${index}.addonPrice`}
                  placeholder="Addon Price"
                  {...register(`addons.${index}.addonPrice`, { required: true, pattern: /^[0-9]*$/ })}
                  className="w-full p-2 rounded-md"
                />


                {/* Button for Remove Addon */}
                <span
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveAddon(index)}
                >
                  <X className="w-3 h-3 rounded-full text-red-500 hover:bg-red-600 hover:text-white" />
                </span>
              </div>
            ))}

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
            {/* <div className="overflow-x-auto whitespace-nowrap mt-4">
              <div className="flex flex-nowrap max-w-[30px]">
                {addonFields.map((addon, index) => (
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
            </div> */}
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
          <label htmlFor="images" className="text-lg font-bold">
            Image Upload
          </label>
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

        {(!selectedImages.length || errors.images) && (
          <p className="text-sm font-semibold text-red-600 mt-2">
            {errors.images ? errors.images.message : 'Upload at least one image.'}
          </p>
        )}


        <div className="overflow-x-auto whitespace-nowrap mt-4">
          <div className="flex flex-nowrap w-full h-full">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative w-16 h-16 m-1">
                <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="object-cover rounded-md" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-white-500 text-white rounded-full "
                >
                  <X className="w-4 h-4 rounded-full bg-red-500 text-white-500 hover:bg-red-700 hover:text-white" />
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




