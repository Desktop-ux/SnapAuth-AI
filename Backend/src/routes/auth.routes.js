const express = require('express')
const router = express.Router()
const jwt =  require('jsonwebtoken')
const userModel = require('../models/user.models')
const { registerController , loginCOntroller } = require('../controllers/auth.controllers')
const authMiddleware = require('../middlewares/auth.middlewares')

// Register
router.post('/register', registerController)
// LOGIN
router.post('/login', loginCOntroller)
// LOGOUT
router.post('/logout' , (req , res)=>{
    res.clearCookie('token')
    res.status(200).json({message : "Logout successful"})
})

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user
  });
});
module.exports = router