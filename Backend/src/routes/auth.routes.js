const express = require('express')
const router = express.Router()
const jwt =  require('jsonwebtoken')
const userModel = require('../models/user.models')
const { registerController , loginCOntroller } = require('../controllers/auth.controllers')

// Register
router.post('/register', registerController)
// LOGIN
router.post('/login', loginCOntroller)
// LOGOUT
router.post('/logout' , (req , res)=>{
    res.clearCookie('token')
    res.status(200).json({message : "Logout successful"})
})

module.exports = router