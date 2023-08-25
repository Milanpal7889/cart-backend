const express = require ('express');
const { body, validationResult } = require ('express-validator');
const User = require ('../models/Cart');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const router = express.Router();
const fetchuser = require ('../middleware/Fetchuser')
const JWT_SECRET = "a0f9c6d3b0f8c9a5f6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9";
let success = true

router.get('/new',(req, res)=>{
    res.send("working fine")
  })



  module.exports = router;