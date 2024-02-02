/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable array-bracket-spacing */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable eol-last */

// REVIEW:
// TODO: Pass this into the add to cart function, and wherever else it's needed
const createProductIdentifier = async (options) => {
  let identifiers = [];
  for (let option of options) {
    if (option.includes(" ")) {
      option = option.replace(" ", "-");
    }
    identifiers.push(option);
  }
  return identifiers.join("-").toLowerCase();
};

// REVIEW:
const sizes = [{ price: 12, name: "Large" }, { price: 8, name: "Small" }];
const addons = [{ price: 2, name: "Extra Cheese" }, { price: 1, name: "Olives" }];

const chosenSizeOption = sizes[0];
const chosenAddonOption = addons[1];

const identifier = createProductIdentifier([chosenSizeOption.name, chosenAddonOption.name]);

console.log(identifier);
console.log(chosenSizeOption);
console.log(chosenAddonOption);