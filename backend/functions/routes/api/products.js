/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const router = require("express").Router();
const admin = require("firebase-admin");
const express = require("express");

/**
 * This is for testing the route
 */
router.get("/", (req, res) => {
  return res.send("Inside the products router");
});

router.post("/create", async (req, res) => {
  try {
    const productData = req.body;

    const id = generateProductId();

    const product = {
      productId: id,
      ...productData,
    };

    // Save the product to Firestore
    const result = await admin.firestore().collection("products").add(product);

    return res.status(201).send({ success: true, productId: result.id });
  } catch (error) {
    console.error("Error in creating product:", error);
    return res.status(500).send({ success: false, msg: `Error in creating product: ${error.message}` });
  }
});

function generateProductId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

router.get("/all", async (req, res) => {
  try {
    const querySnapshot = await admin.firestore().collection("products").get();

    /** This  will be the expected types for each
     * Represents the response data for the query snapshot.
     * @typedef {Object} ResponseData
     * @property {string} id - The ID of the document.
     * @property {string} productName - The name of the product.
     * @property {number} basePrice - The base price of the product.
     * @property {Array<Object>} sizes - The available sizes of the product.
    * @property {Array<Object>} addons - The available addons for the product. Each addon should have a "price" and "name" property.
    * @property {Array<string>} ingredients - The ingredients of the product. Each ingredient should be a string.
     * @property {string} description - The description of the product.
     */

    /**
     * Maps the query snapshot documents to the response data format.
     * @param {Array<Object>} querySnapshot - The query snapshot documents.
     * @returns {Array<ResponseData>} The mapped response data.
     */
    const response = querySnapshot.docs.map((doc) => {
      const { productName, basePrice, sizes, addons, ingredients, description } = doc.data();
      return {
        id: doc.id,
        productName,
        basePrice,
        sizes,
        addons,
        ingredients,
        description,
      };
    });

    return res.status(200).send({ success: true, data: response });
  } catch (error) {
    console.error("Error in getting products:", error);
    return res.status(500).send({ success: false, msg: `Error in getting products: ${error.message}` });
  }
});


module.exports = router;
