const express = require('express');
const router = express.Router();
const cart = require('../models/Cart');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


router.get('/new',(req, res)=>{
    res.send("working fine")
  })

// // Route 1: Get all the notes using GET "api/cart/fetchcart"
// router.get('/fetchcart', fetchuser, async (req, res) => {
//     try {
//         const cartProducts = await cart.find({ user: req.user.id });
//         // res.json(cartProducts);
//         res.send("no product available")
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }
// });




module.exports = router;