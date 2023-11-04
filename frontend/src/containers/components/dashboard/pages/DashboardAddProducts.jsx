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
import { ChefHat, CircleDollarSign, DollarSign, Plus } from "lucide-react";

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

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsNumeric(!isNaN(value));
  };
  return (
    <div className="border-2">
      <div className="flex items-center justify-center">
        <form className="flex max-w-md flex-col gap-4">
          <div id="fileUpload" className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload product image" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <FileInput id="file" required colors="failure" />
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="product-name" value="Product Name" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>
            <TextInput
              id="product-name"
              placeholder="Product Name"
              addon=<ChefHat className="w-4 h-4" />
              required
            />
          </div>
          <div className="max-w-md">
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
              <option>Others</option>
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
              addon=<CircleDollarSign className="w-4 h-4" />
              required
              value={inputValue}
              onChange={handleChange}
            />
            {isNumeric ? (
              <span className="text-success"></span>
            ) : (
              <span className="text-red-600  text-sm font-semibold">
                This must be a number value.
              </span>
            )}
          </div>
          {/* TODO: Ingredients */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username3" value="Sizes" />
              <span className="ml-0.5 text-red-600 font-semibold text-md">
                *
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="accept" />
              <Label htmlFor="accept" className="flex">
                Small
              </Label>
              <Checkbox id="accept" defaultChecked />
              <Label htmlFor="accept" className="flex">
                Regular (Default)
              </Label>
              <Checkbox id="accept" />
              <Label htmlFor="accept" className="flex">
                Large
              </Label>
            </div>
            {/* Add onClick that will bring up a text input for this, the text input must be single text input wherein it holds multiple values */}
            <div className="flex items-center gap-2 py-4">
              <Checkbox id="accept" />
              <Label htmlFor="accept" className="flex">
                Custom
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="flex">
              Add Addons?
            </Label>
          </div>

          <div className="flex max-w-md flex-col gap-4">
            <ToggleSwitch
              checked={isPublished}
              label="Make Visible"
              onChange={setIsPublished}
            />

          </div>
          <Button type="submit">Add</Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddProducts;
