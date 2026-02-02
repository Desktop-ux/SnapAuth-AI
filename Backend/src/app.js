const express = require('express')
const AuthRoutes = require('./routes/auth.routes')
const PostRoutes = require('./routes/post.route')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.json())
app.use('/api/auth' , AuthRoutes)
app.use('/api/posts' , PostRoutes)

module.exports = app