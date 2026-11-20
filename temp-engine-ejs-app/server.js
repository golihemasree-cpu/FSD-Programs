import express from "express";
import {
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct,
  createProductForm,
} from "./controllers/productController.js";

import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS View Engine
app.set("view engine", "ejs");

// Connect to MongoDB
await connectDB(process.env.MONGO_URI, process.env.DB_NAME);

// CRUD Operations for Products

// Display all products
app.get("/", readProducts);

// Display product form
app.get("/product-form", createProductForm);

// Add new product
app.post("/add-product", createProduct);

// Display single product
app.get("/product/:id", readProductById);

// Display update product form
app.get("/product-form/:id", updateProductForm);

// Update product
app.post("/add-product/:id", updateProduct);

// Delete product
app.get("/delete-product/:id", deleteProduct);

// Server Configuration
const PORT = process.env.PORT || 9500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});