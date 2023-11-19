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
  Send,
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

// TODO: Make this consistent 

// TODO: Fix image upload not allowing submit if another file type is uploaded
export const DashboardAddProducts = () => {

  const { control, handleSubmit, register, setValue, setError, getValues, watch, reset, formState: { errors },
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
      // TODO: Add other fields
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

  const { fields: addonFields, append: appendAddon, remove: removeAddon } = useFieldArray({
    control,
    name: 'addons',
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images',
  });

  // TODO: There must be at least one value for ingredients, addon, ingredients

  const handleRemoveSize = (index) => {
    const isChecked = watch(`sizes.${index}.checked`);

    if (isChecked) {
      setValue(`sizes.${index}.customSizeName`, '');
      setValue(`sizes.${index}.customSizePrice`, '');
    }

    if (sizeFields.length > 1) {
      removeSize(index);
    };
  }

  const handleAddAddon = () => {
    appendAddon({ addonName: '', addonPrice: '' });
  };

  const handleAddIngredient = () => {
    appendIngredient({ value: '' });

  };


  const handleAddCustomSize = () => {
    appendSize({ name: 'custom', price: '', checked: true })
  };

  const handleRemoveImage = (index) => {
    // Remove from imageFields using remove function
    removeImage(index);

    // Remove from selectedImages
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };


  const handleRemoveAddon = (index) => {
    if (addonFields.length > 1) {
      removeAddon(index);
    }
  };

  const handleRemoveIngredients = (index) => {
    if (ingredientFields.length > 1) {
      removeIngredient(index);
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);

  // FIXME: Addons is not off when clearing form
  // FIXME: Image array is not cleared when clearing form
  const handleClearForm = () => {
    reset({
      productName: '',
      category: '',
      basePrice: '',
      ingredients: [{ value: '' }],
      sizes: [
        { name: 'small', price: '' },
        { name: 'regular', price: '' },
        { name: 'large', price: '' },
      ],
      customSizeName: '',
      customSizePrice: '',
      noAddons: false,
      addons: [{ addonName: '', addonPrice: '' }],
      isPublished: false,
      isFeatured: false,
      images: [],
      selectedImages: [],

      // TODO: Add other fields if needed
    });
  };


  const isPublished = useWatch({ control, name: 'isPublished', defaultValue: false });
  const isFeatured = useWatch({ control, name: 'isFeatured', defaultValue: false });




  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: useCallback((acceptedFiles) => {
      // Filter out non-image files
      const newImages = acceptedFiles.filter(file => file.type.startsWith('image/'));

      if (newImages.length !== acceptedFiles.length) {
        // Non-image files were dropped, set an error
        setError('images', {
          type: 'manual',
          message: 'Only images are allowed.',
        });
      } else {
        setValue('images', [...selectedImages, ...newImages]);
        setSelectedImages([...selectedImages, ...newImages]);
      }
    }, [selectedImages, setValue, setError]),
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




  const onSubmit = (data) => {
    // const filteredSizes = data.sizes.filter((size) => size.checked || size.name !== 'custom');
    // data.sizes = filteredSizes;
    const currentDate = new Date();

    // Convert the Date object to a string in the desired format
    const formattedDateString = currentDate.toISOString().slice(0, 10);

    console.log('Formatted current date:', formattedDateString);

    // Add the formatted date to the data object
    data.dateAdded = formattedDateString;

    console.log('Form data:', data);
    // Add your logic to handle form submission
  };

  return (
    <form className=' max-w-3xl mx-auto bg-blue-100 border-4 shadow-md sm:rounded-lg p-8 overflow-x-auto' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-6 sm:grid-cols-1 lg:grid-cols-2'>
        <div className=''>

          {/* Product Name */}
          <div className="mb-4">
            <div className="block mb-2">
              <Label htmlFor="productName" className="text-sm">
                Product Name
              </Label>
              <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
            </div>
            <input
              id="productName"
              placeholder="Product Name"
              {...register('productName', { required: true })}
              className={`w-full p-2 rounded-md ${errors.productName ? 'border-red-500 border-2 rounded-lg' : ''}`}
            />
            {errors.productName && (
              <span className="text-red-600 text-sm font-semibold">This is a required field</span>
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
              className={`w-full p-2 border rounded-md ${errors.category ? 'border-red-500 border-2 rounded-lg' : ''}`}
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
              <span className="text-red-600 text-sm font-semibold">Please select a category</span>
            )}
          </div>


          {/* Price */}
          <div className="mb-4">
            <div className="block mb-2">
              <Label htmlFor="basePrice" value="Base Price" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
            </div>
            <input
              id="basePrice"
              type="text"
              // addon={<CircleDollarSign className="w-4 h-4" />}
              placeholder="Price"
              {...register('basePrice', { required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/, })}
              className={`w-full rounded-md ${errors.basePrice ? 'border-red-500 border-2 rounded-lg' : ''}`}
            />
            {errors.basePrice && (
              <span className="text-red-600 text-sm font-semibold">
                {errors.basePrice.type === 'required'
                  ? 'This is a required field'
                  : 'Invalid Decimal Number'}
              </span>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <Label htmlFor="ingredients" className="text-md">
              Ingredients
            </Label>
            <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>

            {ingredientFields.map((field, index) => (
              <div key={field.id} className="flex items-center justify-center text-sm py-2 ">
                <input
                  type='text'
                  id={`ingredients.${index}.value`}
                  name={`ingredients.${index}.value`}
                  placeholder="List of ingredients"
                  {...register(`ingredients.${index}.value`, { required: 'This is a required field' })}
                  defaultValue={field.value || ''}
                  className={`w-full py-2 ${errors?.ingredients?.[index]?.value ? 'border-red-500 border-2 rounded-lg' : ''} rounded-md`}
                />
                <span
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveIngredients(index)}
                >
                  <X
                    className="w-4 h-4 rounded-full border text-red-500 hover:bg-red-600 hover:text-white shadow hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300" />
                </span>
              </div>
            ))}

            {/* FIXME: Why is this value undefined undefined */}
            {/* {errors?.ingredients?.map((error, index) => (
              <p key={index} className="text-sm font-semibold text-red-600 mt-2">
                {error.value.message}
              </p>
            ))} */}

            {/* FIXED: */}
            {Object.keys(errors.ingredients ?? {}).map((key, index) => (
              <p key={index} className="text-sm font-semibold text-red-600 mt-2">
                {errors.ingredients[key]?.value?.message || ''}
              </p>
            ))}

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleAddIngredient}
                className=" sm:w-auto flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <PlusCircle className="w-4 h-4 mr-2" /><span>Add Ingredient</span>
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Label htmlFor="sizes" className="text-md">
              Sizes
            </Label>
            {sizeFields.map((size, index) => (
              <div key={size.id}>
                <div className="flex flex-col space-y-2 mb-2">
                  <div className="flex items-center">
                    <Checkbox
                      type="checkbox"
                      {...register(`sizes.${index}.checked`)}
                      className="mr-2"
                    />
                    <Label htmlFor={`sizes.${index}.checked`} className="text-md">
                      {size.name.charAt(0).toUpperCase() + size.name.slice(1)}
                    </Label>
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => handleRemoveSize(index)}
                    >
                      <X
                        className="w-4 h-4 rounded-full text-red-500 hover:bg-red-600 hover:text-white shadow hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300" />
                    </span>
                  </div>
                  {watch(`sizes.${index}.checked`) && size.name !== 'custom' && (
                    <div>
                      <Controller
                        name={`sizes.${index}.price`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <div>
                            <input
                              type="text"
                              {...field}
                              placeholder={`${size.name.charAt(0).toUpperCase() + size.name.slice(1)} Size Price`}
                              className={` w-full p-2 rounded-md ${errors?.sizes?.[index]?.price ? 'border-red-500 border-2 rounded-lg' : ''}`}
                            />
                            {errors.sizes && errors.sizes[index] && errors.sizes[index].price && (
                              <p className="text-sm font-semibold text-red-600 mt-2">
                                {errors.sizes[index].price.message}
                              </p>
                            )}
                          </div>
                        )}
                        rules={{
                          required: 'This is a required field',
                          pattern: {
                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                            message: 'Invalid decimal number',
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {sizeFields.map((size, index) => (
              size.name === 'custom' && size.checked && (
                <div key={index} className="mb-2 py-2">
                  <Label htmlFor={`sizes.${index}.customSizeName`} className="text-md">
                    Custom Size Name
                  </Label>
                  <input
                    type="text"
                    id={`sizes.${index}.customSizeName`}
                    placeholder="Custom Size Name"
                    {...register(`sizes.${index}.customSizeName`, { required: 'This is a required field' })}
                    className={`w-full p-2 rounded-md ${errors?.sizes?.[index]?.customSizeName ? 'border-red-500 border-2 rounded-lg' : ''}`}
                  />
                  {errors.sizes && errors.sizes[index] && errors.sizes[index].customSizeName && (
                    <p className="text-sm font-semibold text-red-600 mt-2">
                      {errors.sizes[index].customSizeName.message}
                    </p>
                  )}

                  {/* TODO: Add the rule check for decimal */}
                  <Label htmlFor={`sizes.${index}.customSizePrice`} className="text-md">
                    Custom Size Price
                  </Label>
                  <input
                    type="text"
                    id={`sizes.${index}.customSizePrice`}
                    placeholder="Custom Size Price"
                    {...register(`sizes.${index}.customSizePrice`, { required: 'This is a required field', pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
                    className={`w-full p-2 rounded-md ${errors?.sizes?.[index]?.customSizePrice ? 'border-red-500 border-2 rounded-lg' : ''}`}
                  />
                  {errors.sizes && errors.sizes[index] && errors.sizes[index].customSizePrice && (
                    <p className="text-sm font-semibold text-red-600 mt-2">
                      {errors.sizes[index].customSizePrice.message}
                    </p>

                  )}
                </div>
              )
            ))}

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleAddCustomSize}
                className=" sm:w-auto flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <PlusCircle className="w-4 h-4 mr-2" /><span>Add Custom Size</span>
              </button>
            </div>
          </div>

          {/* Addons */}
          <div className="mb-4">
            <div className="block mb-2">
              <Label htmlFor="noAddons" className="text-md font-bold">Addons</Label>
            </div>

            <div className="flex items-center mb-2">
              <Checkbox type="checkbox" id="noAddons" {...register('noAddons')} defaultValues className="mr-2" />
              <Label htmlFor="noAddons" className="text-md">No Addons</Label>
            </div>

            {/* Conditional fields based on noAddons checkbox */}
            {!watch('noAddons') && (
              <div className="mb-2">
                {addonFields.map((addon, index) => (
                  <div key={addon.id} className="flex items-center my-4 p-2">
                    <div className="flex-grow">
                      <Label htmlFor={`addons.${index}.addonName`} className="text-md">
                        Addon Name
                      </Label>
                      <Controller
                        name={`addons.${index}.addonName`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <div>
                            <input
                              type="text"
                              {...field}
                              placeholder="Addon Name"
                              className={`w-full p-2 rounded-md ${errors?.addons?.[index]?.addonName ? 'border-red-500 border-2 rounded-lg' : ''
                                }`}
                            />
                            {errors.addons && errors.addons[index] && errors.addons[index].addonName && (
                              <p className="text-sm font-semibold text-red-600 mt-2">
                                {errors.addons[index].addonName.message}
                              </p>
                            )}
                          </div>
                        )}
                        rules={{
                          required: 'This is a required field',
                        }}
                      />

                      <Label htmlFor={`addons.${index}.addonPrice`} className="text-md">
                        Addon Price
                      </Label>
                      <Controller
                        name={`addons.${index}.addonPrice`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <div>
                            <input
                              type="text"
                              {...field}
                              placeholder="Addon Price"
                              className={`w-full p-2 rounded-md ${errors?.addons?.[index]?.addonPrice ? 'border-red-500 border-2 rounded-lg' : ''
                                }`}
                            />
                            {errors.addons && errors.addons[index] && errors.addons[index].addonPrice && (
                              <p className="text-sm font-semibold text-red-600 mt-2">
                                {errors.addons[index].addonPrice.message}
                              </p>
                            )}
                          </div>
                        )}
                        rules={{
                          required: 'This is a required field',
                          pattern: {
                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                            message: 'Invalid decimal number',
                          },
                        }}
                      />
                    </div>
                    {/* Button for Remove Addon */}
                    <div className='absolute right-11 mb-44'>
                      <span
                        className="ml-2 cursor-pointer"
                        onClick={() => handleRemoveAddon(index)}
                      >
                        <X
                          className="w-4 h-4 rounded-full text-red-500 hover:bg-red-600 hover:text-white shadow hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                        />
                      </span>
                    </div>
                  </div>
                ))}

                {/* Button for Add Addons */}
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleAddAddon}
                    className=" sm:w-auto flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /><span>Add Addons</span>
                  </button>
                </div>
              </div>
            )}


          </div>


          {/* Set Visibility */}
          <div className="mb-4">
            <div className="block mb-2">
              <Label htmlFor="isPublished" className="text-md font-bold" value="Set Published" />
            </div>

            <Switch
              id="isPublished"
              checked={isPublished}
              onChange={(value) => setValue('isPublished', value)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600  rounded"
            />
          </div>

          {/* Set Featured */}
          <div className="mb-4">
            <div className="block mb-2">
              <Label htmlFor="isFeatured" className="text-md font-bold" value="Set Featured" />
            </div>

            <Switch
              id="isFeatured"
              checked={isFeatured}
              onChange={(value) => setValue('isFeatured', value)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600  rounded"
            />
          </div>

          {/* Image Upload */}
          {/* FIXME: Drop and drop not working */}
          <div className="mb-4">
            <div className="block mb-2">
              <Label htmlFor="images" className="text-md font-bold">
                Image Upload
              </Label>
              <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
            </div>

            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-active' : ''}`}>
              <input {...getInputProps()} onChange={handleImageChange} />
              <div className="flex flex-col border-2 border-dashed border-blue-400 items-center justify-center p-4 cursor-pointer">
                <UploadCloudIcon className="w-32 h-16 text-blue-500" />
                {isDragActive ? (
                  <p className="text-gray-600">Drop the files here...</p>
                ) : (
                  <p className="text-gray-600">Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </div>

            {(selectedImages.length === 0 || errors.images) && (
              <p className="text-sm font-semibold text-red-600 mt-2">
                {errors.images ? errors.images.message : 'Upload at least one image.'}
              </p>
            )}

            {/*  FIXME: Image preview doesn't work for some reason?????*/}
            <div className="overflow-x-auto whitespace-nowrap mt-4">
              <div className="flex flex-nowrap w-full h-full">
                {imageFields.map((image, index) => (
                  <div key={index} className="relative w-16 h-16 m-1">
                    <img
                      src={image instanceof File ? URL.createObjectURL(image) : image.url}
                      alt={`Preview ${index}`}
                      className="object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-white-500 text-white rounded-full"
                    >
                      <X
                        className="w-4 h-4 rounded-full text-red-500 hover:bg-red-600 hover:text-white shadow hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            <div className="w-full sm:w-auto">
              <button
                type="submit"
                className=" sm:w-auto bg-green-500 flex items-center text-white px-4 py-2 rounded-md hover:bg-green-700 shadow hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Form
              </button>
            </div>

            <div className="w-full sm:w-auto flex justify-end mr-2">
              <button
                type="button"
                onClick={handleClearForm}
                className=" sm:w-auto flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 shadow hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Clear Form
              </button>
            </div>
          </div>


        </div>
      </div>
    </form>
  );

};




