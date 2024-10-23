import express from 'express';
import dotenv from 'dotenv'
import Product from './models/products.js';
//import { connect, models } from 'mongoose';
import { connectDB } from './config/db.js';


dotenv.config()

const app = express();
app.use(express.json()) // allows us to accept JSON data in the req.body

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({sucess: true, data: products})

    }catch(error){
        console.log("Error in fetching products:", error.message)
        res.status(500).json({sucess: false, message: "Server Error"})
    }
)

app.post("/api/products", async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ sucess: false, message: "Please provide all the fields" });
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ sucess: true, data: newProduct })
    }
    catch (error) {
        console.error("Error creating a product", error.message)
        res.status(500).json({ sucess: false, message: "Server Error" })
    }
})

app.delete("/api/products/:id", async(req, res) => {
    const {id} = req.params
    try{
      await Product.findByIdAndDelete(id)
      res.status(200).json({sucess: true, message: "Product deleted"})
    }catch(error){
        res.status(404).json({sucess: false, message: "Product not found"})
    }
} )


app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
})
