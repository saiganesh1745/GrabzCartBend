const Product = require("../models/Product"); // models

// Insert product (add product)
const insertProduct = async (request, response) => {
  try {
    const {
      productId,
      productName,
      originalPrice,
      priceDiscount,
      discountValidUntil,
      productImages,
      productDescription,
      productTags, // Expecting this to be an array
      category,
      saleType
    } = request.body;

    // Create image paths based on product type
    // if (productId === "oneplus12r") {
    //   productImages = [
    //     "/images/mobiles/oneplus/1.jpg",
    //     "/images/mobiles/oneplus/2.jpeg",
    //     "/images/mobiles/oneplus/3.jpeg",
    //     "/images/mobiles/oneplus/4.jpeg",
    //     "/images/mobiles/oneplus/5.jpeg",
    //     "/images/mobiles/oneplus/6.jpeg",
    //   ];
    // } else if (productId === "redmi14ultra") {
    //   productImages = [
    //     "/images/mobiles/redmi/1.jpg",
    //     "/images/mobiles/redmi/2.jpg",
    //     "/images/mobiles/redmi/3.jpg",
    //     "/images/mobiles/redmi/4.jpg",
    //     "/images/mobiles/redmi/5.jpg",
    //     "/images/mobiles/redmi/6.jpeg",
    //   ];
    // }

    const newProduct = new Product({
      productId,
      productName,
      originalPrice,
      priceDiscount,
      discountValidUntil,
      productImages,
      productDescription,
      productImages, // Store image paths here
      productTags: Array.isArray(productTags) ? productTags : [], // Ensure productTags is an array
      category,
      saleType: saleType || 'Regular',
    });

    await newProduct.save();
    response
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};


// Get product by productId
const getProductById = async (request, response) => {
  const { productId } = request.params;

  try {
    const product = await Product.findOne({ productId });
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    response.json(product);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const getAllNonRegularProducts = async (req, res) => {
  try {
    // Query to fetch products where saleType is not 'Regular'
    const products = await Product.find({ saleType: { $ne: 'Regular' } });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

module.exports = { insertProduct, getProductById, getAllProducts,getAllNonRegularProducts };