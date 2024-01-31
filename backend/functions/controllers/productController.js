/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
/* eslint-disable max-len */

const admin = require("firebase-admin");
const db = admin.firestore();
const productsRef = db.collection("products");
const { productSchema } = require("../models/productModel");


// NOTE: To get a sample response from these API endpoints refer to the readme in the route directory
const productTestRouteServer = (_req, res, next) => {
  res.status(200).send({ success: true, msg: "Inside Products Route" })
};

/**
 * Add a new product to firebase.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Object} - The response object containing the success status and product data.
 * @throws {Object} - The response object containing the error status and error message.
 */
const addNewProductServer = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ success: false, msg: `VALIDATION ERROR: ${error.message}` });
    } else {
      const product = {
        ...value,
      };

      productsRef.add(product).then((docRef) => {
        return res.status(200).send({ success: true, data: docRef.id });
      }).catch((error) => {
        console.error("Error adding document: ", error);
        return res.status(500).send({ success: false, msg: `SAVE PRODUCT ERROR [SERVER] ${error.message}` });
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: `CREATE PRODUCT ERROR [SERVER] ${error.message}` });
  }
};

/**
 * Retrieves all products from the Firestore database.
 * @param {Object} _req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Object} - The response object containing the retrieved products.
 * @throws {Object} - The response object containing the error message if an error occurs.
 */
const getAllProductsServer = async (_req, res, next) => {
  try {
    const querySnapshot = await admin.firestore().collection("products").get();

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
    console.log(`GET ALL PRODUCTS ERROR [SERVER] ${error.message}`)
    return res.status(500).send({ success: false, msg: `GET ALL PRODUCTS ERROR [SERVER] ${error.message}` });
  }
};

module.exports = {
  getAllProductsServer, addNewProductServer, productTestRouteServer,
};
