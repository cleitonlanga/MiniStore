import express from "express"
import mongoose from 'mongoose';
import Product from "../models/products.js"
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/products.controller.js";

const router = express.Router()

router.get("", getAllProducts)

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router