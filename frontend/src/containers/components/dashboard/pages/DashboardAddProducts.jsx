import React, { useState } from "react";
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
} from "flowbite-react";
import {
  ChefHat,
  CircleDollarSign,
  DollarSign,
  Plus,
  Save,
  UploadCloudIcon,
  Utensils,
  UtensilsCrossed,
  X,
} from "lucide-react";

// TODO: Add validation for the form, and add onSubmit handler
// TODO: Add a form reset button
// TODO: Add a form cancel button
// TODO: Add default date value of now() for date added
// TODO: Add a form submit handler
// TODO: Update styles, make it a grid layout
// TODO: Disable button until all required fields are filled out and valid
// TODO: Add form item validation
// TODO: Add functionalities for all
// const onSubmit = (e) => {
//   e.preventDefault();
//   console.log("Form submitted!");
// };
// TODO: If possible make this into a reusable component
const DashboardAddProducts = (data, fields, labels) => {
  const [addons, setAddons] = useState([]);
  const [currentAddon, setCurrentAddon] = useState({
    name: "",
    addonPrice: "",
  });
  const [isNoAddons, setIsNoAddons] = useState(true);
  const [productName, setProductName] = useState(""); // Initialize with an empty string

  const [isPublished, setIsPublished] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customSizes, setCustomSizes] = useState([]);
  const [customSize, setCustomSize] = useState("");

  const [ingredientError, setIngredientError] = useState("");

  const [addonPrice, setAddonPrice] = useState("");
  const [price, setPrice] = useState("");
  const [isAddonPriceNumeric, setIsAddonPriceNumeric] = useState(true);
  const [isPriceNumeric, setIsPriceNumeric] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const handleAddAddon = () => {
    if (
      currentAddon.addonName.trim() !== "" &&
      currentAddon.addonPrice.trim() !== ""
    ) {
      setAddons([...addons, currentAddon]);
      setCurrentAddon({ addonName: "", addonPrice: "" });
    }
  };

  const handleRemoveAddon = (index) => {
    const newAddons = [...addons];
    newAddons.splice(index, 1);
    setAddons(newAddons);
  };

  const handleAddIngredient = () => {
    if (!currentIngredient.trim()) {
      setIngredientError(`Don't add empty ingredients!`);
    } else {
      setIngredientError("");
      const newIngredients = [...ingredients, currentIngredient];
      setIngredients(newIngredients);
      setCurrentIngredient("");
    }
  };

  const handleIngredientChange = (e) => {
    setCurrentIngredient(e.target.value);
  };

  const handleIngredientKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const toggleCustomSize = () => {
    setIsCustomSize(!isCustomSize);
    if (!isCustomSize) {
      setCustomSize("");
    }
  };

  const handleAddCustomSize = () => {
    if (customSize.trim()) return;
    setCustomSizes([...customSizes, customSize]);
    setCustomSize("");
  };
// TODO: Adding form validation
//   const handleAddCustomSize = () => {
//     if (!customSize.trim()) {
//       setCustomSizeError(`Don't add empty sizes!`);
// }else{
//       setCustomSizeError("");
//       const newCustomSizes = [...customSizes, customSize];
//       setCustomSizes(newCustomSizes);
//       setCustomSize("");
//     }
//   };
// }

  const handleRemoveCustomSize = (index) => {
    const updatedCustomSizes = [...customSizes];
    updatedCustomSizes.splice(index, 1);
    setCustomSizes(updatedCustomSizes);
  };

  const handleCustomSizeKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomSize();
    }
  };

  const handlePriceNumberCheck = (e) => {
    const priceValue = e.target.value;
    setPrice(priceValue);
    setIsPriceNumeric(!isNaN(priceValue));
  };
  const handleAddonPriceNumberCheck = (e) => {
    const addonPriceValue = e.target.value;
    setAddonPrice(addonPriceValue);
    setIsAddonPriceNumeric(!isNaN(addonPriceValue));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const imageArray = Array.from(files);
      setSelectedImages([...selectedImages, ...imageArray]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <div className="p-4 bg-slate-100">
      <div className="flex flex-col items-center p-12 ">
        <h1 className="mb-4 text-3xl">Add a new product</h1>

        <form className="grid flex-shrink-0 grid-cols-2 p-8 bg-blue-100 border-4 border-gray-300 sm:grid-cols-1 gap-x-6 gap-y-8">
          <div>
            <div className="block mb-2">
              <Label htmlFor="product-name" value="Product Name" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <TextInput
              id="product-name"
              placeholder="Product Name"
              addon={<ChefHat className="w-4 h-4" />}
              required
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="product-category" value="Select your category" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <Select id="product-category" required>
              <option value="">Select food category</option>
              <option>Burgers</option>
              <option>Pizza</option>
              <option>Pasta</option>
              <option>Sushi</option>
              <option>Steak</option>
              <option>Tacos</option>
              <option>Desserts</option>
              <option>Salads</option>
              <option>Beverages</option>
              <option>Burritos</option>
              <option>Sandwiches</option>
              <option>Breakfast</option>
              <option>Seafood</option>
              <option>Appetizers</option>
              <option>Fast Food</option>
              <option>Others</option>{" "}
            </Select>
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="price" value="Price" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <TextInput
              id="price"
              type="text"
              addon={<CircleDollarSign className="w-4 h-4" />}
              required
              placeholder="Price"
              value={price}
              onChange={handlePriceNumberCheck}
            />
            {isPriceNumeric ? (
              <span className="text-success"></span>
            ) : (
              <span className="text-sm font-semibold text-red-600">
                Product price must be a number value.
              </span>
            )}
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="ingredients" value="Ingredients" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>

            <TextInput
              id="ingredients"
              placeholder="List of ingredients"
              addon={<UtensilsCrossed className="w-4 h-4" />}
              required
              value={currentIngredient}
              onChange={(e) => {
                setCurrentIngredient(e.target.value);
                setIngredientError("");
              }}
              onKeyPress={handleIngredientKeyPress}
              className={ingredientError ? "border-rose-500" : ""}
            />
            {ingredientError && (
              <p className="text-sm font-semibold text-red-600">
                {ingredientError}
              </p>
            )}
            <div className="flex justify-end mr-2">
              <button
                type="button"
                onClick={handleAddIngredient}
                className="flex items-center text-blue-800 cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Ingredient
              </button>
            </div>

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
                      <X className="w-3 h-3 rounded-full text-rose-500 hover:bg-red-600 hover:text-white" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>{" "}
          <div>
            <div className="block mb-2">
              <Label htmlFor="username3" value="Sizes" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            {/* TODO: */}
            <div className="grid grid-cols-4 gap-1">
              <Label htmlFor="small-size" className="">
                Small
              </Label>
              <Checkbox id="small-size" />

              <Label htmlFor="regular-size" className="">
                Regular
              </Label>
              <Checkbox id="regular-size" defaultChecked />

              <Label htmlFor="large-size" className="">
                Large
              </Label>
              <Checkbox id="large-size" />

              <Label htmlFor="custom-size" className="">
                Custom
              </Label>
              <Checkbox
                id="custom-size"
                onClick={toggleCustomSize}
                checked={isCustomSize}
                onChange={() => setIsCustomSize(!isCustomSize)}
              />
            </div>

            {isCustomSize && (
              <div>
                <div>
                  <div className="block mt-4 mb-2">
                    <Label htmlFor="custom-size" value="Custom Size" />
                  </div>
                  <TextInput
                    id="custom-size"
                    placeholder="8 ounce"
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                    onKeyPress={handleCustomSizeKeyPress}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddCustomSize}
                    className="flex items-center text-blue-800 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Size
                  </button>
                </div>
              </div>
            )}
            <div className="overflow-x-auto whitespace-nowrap">
              <div className="flex flex-nowrap max-w-[30px]">
                {customSizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-1 m-1 text-xs font-semibold rounded-full bg-slate-300"
                  >
                    {size}
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => handleRemoveCustomSize(index)}
                    >
                      <X className="w-3 h-3 rounded-full text-rose-500 hover:bg-red-600 hover:text-white" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="add-addons" value="Add Addons" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="add-addons"
                defaultChecked
                onChange={() => setIsNoAddons(!isNoAddons)}
              />
              <Label htmlFor="add-addons" className="flex">
                No Addons?
              </Label>
            </div>
            {!isNoAddons && (
              <div className="pt-4">
                <div>
                  <div className="block mt-6 mb-2">
                    <Label htmlFor="addon-name" value="Addon Name" />
                  </div>
                  <div className="">
                    <TextInput
                      id="addon-name"
                      placeholder="Addon Name"
                      value={currentAddon.addonName}
                      onChange={(e) =>
                        setCurrentAddon({
                          ...currentAddon,
                          addonName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="block mb-2">
                    <Label htmlFor="addon-price" value="Addon Price" />
                  </div>
                  <div className="">
                    <TextInput
                      id="addon-price"
                      placeholder="Addon Price"
                      value={currentAddon.addonPrice}
                      onChange={(e) =>
                        setCurrentAddon({
                          ...currentAddon,
                          addonPrice: e.target.value,
                        })
                      }
                      onKeyPress={handleAddonPriceNumberCheck}
                    />
                    {isAddonPriceNumeric ? (
                      <span className="text-success"></span>
                    ) : (
                      <span className="text-sm font-semibold text-red-600">
                        Addon price must be a number value.
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mr-2">
                  <button
                    type="button"
                    onClick={handleAddAddon}
                    className="flex items-center text-blue-800 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Addon
                  </button>
                </div>
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
          <div>
            <div className="block mb-2">
              <Label htmlFor="set-visibility" value="Set Visibility" />
            </div>
            <div className="flex flex-col gap-4">
              <ToggleSwitch
                checked={isPublished}
                label="Published"
                onChange={setIsPublished}
              />
            </div>
          </div>
          <div className="">
            <div className="block mb-2 ">
              <label htmlFor="product-images" className="block mb-2 ">
                Product Images
              </label>

              <label className="flex flex-col items-center justify-center px-4 py-6 tracking-wide uppercase bg-white border rounded-lg shadow-lg cursor-pointer border-blue dark:text-white">
                <div className="flex flex-col items-center justify-center">
                  <UploadCloudIcon className="w-8 h-8 text-blue-500" />
                  <span className="mt-2 text-base leading-normal">
                    Choose files
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
              {/* TODO: Properly implement the horizontal scrollbar */}
              <div className="">
                <div className="flex flex-col items-center justify-center pt-4 transition-transform duration-200 transform hover:scale-110">
                  {selectedImages.length > 0 && (
                    <div className="mb-4">
                      <span className="flex flex-col items-center justify-center">
                        Image Preview
                      </span>
                      <div className="flex overflow-x-auto whitespace-nowrap max-w-[256px]">
                        <div className="flex flex-nowrap">
                          {selectedImages.map((image, index) => (
                            <div
                              key={index}
                              className="relative inline-block mx-2"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt="Selected Product"
                                className="object-cover w-24 h-24 rounded-lg"
                              />
                              <button
                                className="absolute p-2 m-2 text-red-600 bg-white rounded-full -top-1 -right-1 hover:bg-red-500 hover:text-white"
                                onClick={() => removeImage(index)}
                              >
                                <X className="w-3 h-3 " />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end col-span-2">
            <div>
              <Button type="submit">
                <Save className="w-4 h-4 " />
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddProducts;
