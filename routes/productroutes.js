const productController = require("../controllers/productcontroller");
const express = require("express");
const productRouter = express.Router();

// Add new product
productRouter.post("/addproduct", productController.insertProduct);

// Get product by productId
productRouter.get("/product/:productId", productController.getProductById);

productRouter.get("/products", productController.getAllProducts);

productRouter.get("/saleproducts", productController.getAllNonRegularProducts);

module.exports = productRouter;