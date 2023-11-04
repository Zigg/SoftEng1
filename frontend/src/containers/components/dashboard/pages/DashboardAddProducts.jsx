import React, { useState } from "react";
import {
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
  Utensils,
  UtensilsCrossed,
} from "lucide-react";

// TODO: Add validation for the form, and add onSubmit handler
// TODO: Add a form reset button
// TODO: Add a form cancel button
// TODO: Add default date value of now() for date added
// TODO: Add a form submit handler
// TODO: Update styles, make it a grid layout
// TODO: Disable button until all required fields are filled out and valid
// const onSubmit = (e) => {
//   e.preventDefault();
//   console.log("Form submitted!");
// };

const DashboardAddProducts = (data, fields, labels) => {
  const [inputValue, setInputValue] = useState("");
  const [isNumeric, setIsNumeric] = useState(true);
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);
  const [isCustomSizesOpen, setIsCustomSizesOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const [ingredients, setIngredients] = useState([""]); // Initialize with an empty ingredient

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]); // Add an empty ingredient when the plus button is clicked
  };

  const handleIngredientChange = (index, newValue) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = newValue;
    setIngredients(newIngredients);
  };

  const handleNumberCheck = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsNumeric(!isNaN(value));
  };
  return (
    <div className="p-4 bg-slate-100">
      <div className="flex flex-col items-center p-12  ">
        <h1 className="mb-4 text-3xl">Add a new product</h1>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 border-4 border-gray-300 bg-blue-100 p-8 flex-shrink-0">
          <div id="fileUpload" className="">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload product image" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <FileInput id="file" className="" required colors="failure" />
          </div>

          <div>
            <div className="mb-2 block">
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
            />
          </div>

          <div>
            <div className="mb-2 block">
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
            <div className="mb-2 block">
              <Label htmlFor="username3" value="Price" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <TextInput
              id="username"
              type="text"
              addon={<CircleDollarSign className="w-4 h-4" />}
              required
              value={inputValue}
              onChange={handleNumberCheck}
            />
            {isNumeric ? (
              <span className="text-success"></span>
            ) : (
              <span className="text-red-600  text-sm font-semibold">
                This must be a number value.
              </span>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="username3" value="Sizes" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="small" />
              <Label htmlFor="small" className="flex">
                Small
              </Label>
              <Checkbox id="regular" defaultChecked />
              <Label htmlFor="regular" className="flex">
                Regular
              </Label>
              <Checkbox id="large" />
              <Label htmlFor="large" className="flex">
                Large
              </Label>
            </div>
            <div className="flex items-center gap-2 py-4">
              <Checkbox id="custom" />
              <Label htmlFor="custom" className="flex">
                Custom
              </Label>
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="product-category" value="Create Addons" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="add-addons" defaultChecked />
              <Label htmlFor="add-addons" className="flex">
                No Addons?
              </Label>
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="product-name" value="Ingredients" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <TextInput
              id="product-name"
              placeholder="List of ingredients"
              addon={<UtensilsCrossed className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="product-category" value="Set Visibility" />
            </div>
            <div className="flex max-w-md flex-col gap-4">
              <ToggleSwitch
                checked={isPublished}
                label="Make Visible"
                onChange={setIsPublished}
              />
            </div>
          </div>
          <div className="col-span-2 flex  justify-end">
            <div>
              <Button type="submit">
                <Plus className="w-4 h-4 " />
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddProducts;
