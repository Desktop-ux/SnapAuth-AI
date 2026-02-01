const express = require('express')
const AuthRoutes = require('./routes/auth.routes')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.json())
app.use('/api/auth' , AuthRoutes)

module.exports = app