/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
const router = require("express").Router();
const admin = require("firebase-admin");

router.post("/create", async (req, res) => {
  try {
    const productData = req.body;

    // Validate input data?
    // if (!productData.productName || !productData.basePrice || !productData.sizes || !productData.addons || !productData.ingredients) {
    //   return res.status(400).send({ success: false, msg: "Incomplete product data" });
    // }

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

/**
 * Generates a unique product ID.
 * @return {string}
 */
function generateProductId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// get all products
router.get("/all", async (req, res) => {
  try {
    let query = admin.firestore().collection("products");
    let response = [];

    const querySnapshot = await query.get();

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        productName: doc.data().productName,
        basePrice: doc.data().basePrice,
        sizes: doc.data().sizes,
        addons: doc.data().addons,
        ingredients: doc.data().ingredients,
        description: doc.data().description,
      };
      response.push(selectedItem);
    });

    return res.status(200).send({ success: true, data: response });
  } catch (error) {
    console.error("Error in getting products:", error);
    return res.status(500).send({ success: false, msg: `Error in getting products: ${error.message}` });
  }
});

module.exports = router;
