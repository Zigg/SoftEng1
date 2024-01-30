/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
/* eslint-disable max-len */

const admin = require("firebase-admin");
// const db = admin.firestore();

// NOTE: To get a sample response from these API endpoints refer to the readme in the route directory

const productTestRouteServer = (req, res, next) => {
  res.status(200).send({ success: true, msg: "Inside Products Route" })
};

/**
 * Add a new product to the server.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Object} - The response object containing the success status and product data.
 * @throws {Object} - The response object containing the error status and error message.
 */
const addNewProductServer = async (req, res, next) => {
  try {
    // TODO: The request body fields are not yet validated here, the product ID is the only request sent when setting up this end point for now. You can create a POST request to this endpoint to check, make sure to setup firebase and its collections first before anything else, for consistency create the collection for your firebase store based on the given readme in the models directory

    const productData = req.body;
    const generateProductId = () => {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    const id = generateProductId();

    const product = {
      productId: id,
      ...productData,
    };


    // const result = await admin.firestore().collection("products").add(product);
    // TODO: This is only for testing purposes for now the response is only sending the product ID
    return res.status(200).send({ success: true, data: product });
  } catch (error) {
    return res.status(500).send({ success: false, msg: `CREATE PRODUCT ERROR [SERVER] ${error.message}` });
  }
};


/**
 * Retrieves all products from the Firestore database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Object} - The response object containing the retrieved products.
 * @throws {Object} - The response object containing the error message if an error occurs.
 */
const getAllProductsServer = async (req, res, next) => {
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
