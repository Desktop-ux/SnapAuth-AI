const mongoose = require('mongoose');
const User = require('./user.models');

const postSchema = new mongoose.Schema({
  ImageUrl: {
    type: String,
    required: true
  },
  Caption: {
    type: String,
    required: true
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Post = mongoose.model('posts' , postSchema);

module.exports = Post;