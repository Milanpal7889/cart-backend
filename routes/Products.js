const express = require('express');
const router = express.Router();
const cart = require('../models/Cart');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/Fetchuser');


router.get('/new',(req, res)=>{
    res.send("working fine")
  })

// Route 1: Get all the products using GET "api/cart/fetchcart"
router.get('/fetchcart', fetchuser, async (req, res) => {
    try {
        const cartProducts = await cart.find({ user: req.user.id });
        res.json(cartProducts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 2: Add product using POST "api/product/addproduct"
router.post('/addproduct', fetchuser, [
  body('productId'),
  body('tittle'),
  body('description', 'Please enter description'),
  body('price'),
  body('category'),
  body('image')
], async (req, res) => {
  try {
      const { tittle, description, productId, price, category, image, quantity} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const Product = new cart({
          user: req.user.id,
          productId,
          tittle,
          description,
          price,
          category,
          image,
          quantity
      });
      const savedProduct = await Product.save();
      res.send(savedProduct);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
  }
});


// Route 3: Update quantity using PUT "api/product/updatequantity/id". Login required
router.put('/updatequantity/:id', fetchuser, async (req, res) => {
    try {
        const { quantity } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create new product object with updated fields
        const newProduct = {};
        if (quantity) { newProduct.quantity = quantity; }

        // Find the product to be updated
        let Product = await cart.findById(req.params.id);
        if (!Product) {
            return res.status(404).send("Not Found");
        }

        // Check if the authenticated user owns the product
        if (Product.user.toString()!== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        // Update the product in the database and return the updated product
        Product = await cart.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });
        res.json({ Product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 4: Update product using DELETE "api/product/deleteproduct". Login required
router.delete('/deleteproduct/:id', fetchuser, async (req, res) => {
    try {
        // Find the product to be deleted
        let Product = await cart.findById(req.params.id);
        if (!Product) {
            return res.status(404).send("Not Found");
        }

        // Check if the authenticated user owns the product
        if (Product.user.toString()!== req.user.id) {
            return res.status(401).send("Unauthorized");
        }


        // Delete the product in the database and return the updated product
        Product = await cart.findByIdAndDelete(req.params.id);
        res.json({ "message":"success note has been deleted", Product:Product });

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



module.exports = router;