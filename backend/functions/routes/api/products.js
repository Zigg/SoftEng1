/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const router = require("express").Router();
const admin = require("firebase-admin");

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
