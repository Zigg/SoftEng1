import React, { useState, useEffect } from 'react';
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


  const { control, handleSubmit, register, setValue, watch, reset, formState: { errors },
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
      // TODO: Add other fields if needed
    });
  };
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  // const customSizes = useWatch({ control, name: 'customSizes', defaultValue: [] });
  const selectedSizes = useWatch({ control, name: 'sizes', defaultValue: [] });
  const hasNoAddons = useWatch({ control, name: 'noAddons', defaultValue: true });
  const isVisible = useWatch({ control, name: 'isVisible', defaultValue: false });
  const isFeatured = useWatch({ control, name: 'isFeatured', defaultValue: false });
  const images = useWatch({ control, name: 'images', defaultValue: [] });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setValue('images', acceptedFiles);
    },
    onDropRejected: () => {
      console.log('One or more files were rejected.');
    },
  });

  const handleAddIngredient = () => {
    if (!currentIngredients.trim()) {
      setIngredientsError(`Don't add empty ingredients!`);
    } else {
      setIngredientsError('');
      const newIngredients = [...ingredients, currentIngredients];
      setIngredients(newIngredients);
      setCurrentIngredients('');
    }
    console.log('add action: ingredients:', ingredients);
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
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    console.log('remove action: newIngredients:', newIngredients);
  };

  // FIXME: For multiple images, not working 
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
    <form className='grid flex-shrink-0 grid-cols-2 p-8 bg-blue-100 border-4 border-gray-300 sm:grid-cols-1 gap-x-6 gap-y-8' onSubmit={handleSubmit(onSubmit)}>
      {/* ... other fields ... */}

      {/* Product Name */}
      <div>
        <div className="block mb-2">
          <Label htmlFor="productName" value="Product Name" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <TextInput
          id="productName"
          placeholder="Product Name"
          addon={<UtensilsCrossed className="w-4 h-4" />}
          {...register('productName', { required: true })}
        />
      </div>

      {/* Select Category */}
      <div>
        <div className="block mb-2">
          <Label htmlFor="category" value="Select your category" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <select {...register('category', { required: true })}>
          <option value="">Select food category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <div className="block mb-2">
          <Label htmlFor="price" value="Price" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>
        <TextInput
          id="price"
          type="text"
          addon={<CircleDollarSign className="w-4 h-4" />}
          placeholder="Price"
          {...register('price', { required: true, pattern: /^[0-9]*$/ })}
        />
      </div>

      {/* Ingredients */}
      <div>
        <div className="block mb-2">
          <Label htmlFor="ingredients" value="Ingredients" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>

        <TextInput
          id="ingredients"
          placeholder="List of ingredients"
          addon={<UtensilsCrossed className="w-4 h-4" />}
          {...register('ingredients', { required: true })}
          value={currentIngredients}
          onChange={handleIngredientChange}
          onKeyPress={handleIngredientKeyPress}
          className={ingredientsError ? 'border-rose-500' : ''}
        />

        {/* Display errors */}
        {ingredientsError && (
          <p className="text-sm font-semibold text-red-600">
            {ingredientsError}
          </p>
        )}

        <div className="flex justify-end mr-2">
          <button
            type="button"
            onClick={handleAddIngredient}
            className="flex items-center text-red-800 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Ingredient
          </button>
        </div>

        {ingredients && ingredients.length > 0 && (
          <div className="overflow-x-auto whitespace-nowrap">
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


      <div>
        <div className="block mb-2">
          <Label htmlFor="sizes" value="Sizes" />
        </div>

        <div>
          {['small', 'regular', 'large', 'custom'].map((size) => (
            <React.Fragment key={size}>
              <Checkbox {...register('sizes', { required: true })} value={size} />
              <label htmlFor={size}>{size.charAt(0).toUpperCase() + size.slice(1)}</label>

              {/* Conditional fields based on selected sizes */}
              {selectedSizes.includes(size) && (
                <div>
                  <Label htmlFor={`${size}Price`} value={`${size.charAt(0).toUpperCase() + size.slice(1)} Size Price`} />
                  <TextInput
                    id={`${size}Price`}
                    placeholder={`${size.charAt(0).toUpperCase() + size.slice(1)} Size Price`}
                    {...register(`${size}Price`, { required: true, pattern: /^[0-9]*$/ })}
                  />
                </div>
              )}

              {/* Conditional fields for custom size */}
              {size === 'custom' && selectedSizes.includes('custom') && (
                <div>
                  <Label htmlFor="customSizeName" value="Custom Size Name" />
                  <TextInput
                    id="customSizeName"
                    placeholder="Custom Size Name"
                    {...register('customSizeName', { required: true })}
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
      <div>
        <div className="block mb-2">
          <label htmlFor="noAddons">No Addons</label>
        </div>

        <div>
          <Checkbox type="checkbox" id="noAddons" {...register('noAddons')} defaultChecked />
          <label htmlFor="noAddons">No Addons</label>
        </div>

        {/* Conditional fields based on noAddons checkbox */}
        {!hasNoAddons && (
          <div>
            <label htmlFor="addonName">Addon Name</label>
            <input
              id="addonName"
              placeholder="Addon Name"
              {...register('addonName', { required: true })}
              value={currentAddon.addonName}
              onChange={(e) => setCurrentAddon({ ...currentAddon, addonName: e.target.value })}
            />

            <label htmlFor="addonPrice">Addon Price</label>
            <input
              id="addonPrice"
              placeholder="Addon Price"
              {...register('addonPrice', { required: true, pattern: /^[0-9]*$/ })}
              value={currentAddon.addonPrice}
              onChange={(e) => setCurrentAddon({ ...currentAddon, addonPrice: e.target.value })}
            />

            {/* Button for Add Addons */}
            <div className="flex justify-end mr-2">
              <button
                type="button"
                onClick={handleAddAddon}
                className="flex items-center text-red-800 cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Addons
              </button>
            </div>

            {/* Display added addons */}
            <div className="overflow-x-auto whitespace-nowrap">
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
                      <X className="w-3 h-3 rounded-full text-rose-500 hover:bg-red-600 hover:text-white" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Set Visibility */}
      <div>
        <div className="block mb-2">
          <Label htmlFor="isVisible" value="Set Visibility" />
        </div>

        <Switch
          id="isVisible"
          checked={isVisible}
          onChange={(value) => setValue('isVisible', value)}
        />
      </div>

      {/* Set Featured */}
      <div>
        <div className="block mb-2">
          <Label htmlFor="isFeatured" value="Set Featured" />
        </div>

        <Switch
          id="isFeatured"
          checked={isFeatured}
          onChange={(value) => setValue('isFeatured', value)}
        />
      </div>

      {/* Image Upload */}
      <div>
        <div className="block mb-2">
          <Label htmlFor="images" value="Image Upload" />
          <span className="ml-0.5 text-red-600 font-semibold text-md">*</span>
        </div>

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}

          {images.length > 0 && (
            <div className="overflow-x-auto whitespace-nowrap">
              <div className="flex flex-nowrap max-w-[30px]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-1 m-1 text-xs font-semibold rounded-full bg-slate-300"
                  >
                    {`${image.name}`}
                    {/* Additional logic for removing images if needed */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {images.length === 0 && (
          <p className="text-sm font-semibold text-red-600">
            Please upload at least one image.
          </p>
        )}
      </div>



      {/* ... other fields ... */}
      <div className="flex justify-end mr-2">
        <button
          type="button"
          onClick={handleClearForm}
          className="flex items-center text-red-800 cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Clear Form
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};


