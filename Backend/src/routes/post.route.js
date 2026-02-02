const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/auth.middlewares')
const {postController} = require("../controllers/post.controllers");
const multer = require("multer");

const upload = multer({storage : multer.memoryStorage()});

router.post("/", authMiddleware,upload.single("Image"), postController);

module.exports = router;
