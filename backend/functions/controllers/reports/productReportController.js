const admin = require("firebase-admin");
const realtimeDb = admin.database();


const productIncrement = async (productId) => {
  try {
    const productReportsRef = realtimeDb.ref("product_reports");
    const productSearchCountRef = productReportsRef.child("product_search_count");
    const productRef = productSearchCountRef.child(productId);
    // Increment the count for the specified product.
    await productRef.transaction((currentCount) => {
      return (currentCount || 0) + 1;
    });
  } catch (error) {
    console.error(`PRODUCT INCREMENT ERROR: ${error.message}`);
    throw error;
  }
};


// This function retrieves the details of the product with the given productId.
const getProductDetails = async (productId) => {
  const productRef = realtimeDb.ref(`products/${productId}`);
  const snapshot = await productRef.once("value");
  return snapshot.val();
};

// This function fetches all the trending products based on "product_search_count".
const getTrendingProducts = async () => {
  try {
    const productReportsRef = realtimeDb.ref("product_reports");
    const snapshot = await productReportsRef.once("value");
    const productReports = snapshot.val();

    // Create an array of products with their search counts.
    const productsWithCounts = Object.keys(productReports).map((productId) => ({
      id: productId,
      searchCount: productReports[productId].product_search_count || 0,
    }));

    // Sort the array by search count in descending order.
    productsWithCounts.sort((a, b) => b.searchCount - a.searchCount);

    // Fetch the product details for the top trending products.
    const trendingProductDetails = await Promise.all(
      productsWithCounts.slice(0, 3).map(async (product) => ({
        ...await getProductDetails(product.id),
        searchCount: product.searchCount,
      })),
    );

    return trendingProductDetails;
  } catch (error) {
    console.error(`GET TRENDING PRODUCTS ERROR: ${error.message}`);
    throw error;
  }
};

// This server function sends the trending products data as a response.
const trendingProductsReportServer = async (_req, res, next) => {
  try {
    const data = await getTrendingProducts();
    return res.status(200).send({ success: true, data });
  } catch (error) {
    console.error(`TRENDING PRODUCTS REPORT ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: "TRENDING PRODUCTS REPORT ERROR [SERVER]",
      error: error.message,
    });
  }
};


const getLeastTrendingProducts = async () => {

};

const leastTrendingProductsReportServer = async (_req, res, next) => {
  try {
    const data = await getLeastTrendingProducts();
    return res.status(200).send({ success: true, data });
  }
  catch (error) {
    console.error(`LEAST TRENDING PRODUCTS REPORT ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: "LEAST TRENDING PRODUCTS REPORT ERROR [SERVER]",
      error: error.message,
    });
  }
};

module.exports = {
  trendingProductsReportServer,
  leastTrendingProductsReportServer,
  productIncrement,
};
