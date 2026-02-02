const postmodel = require("../models/post.models");
const generateCaptionForImage = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function postController(req, res) {
  //   console.log("REQ.USER INSIDE CONTROLLER", req.user);

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const base64File = Buffer.from(req.file.buffer).toString("base64");

    const caption = await generateCaptionForImage(base64File);
    console.log("GENERATED CAPTION", caption);

    const result = await uploadFile(base64File, uuidv4());

    console.log("IMAGEKIT RESPONSE", result);
    if (!caption) {
      throw new Error("Caption is empty");
    }

    const imageUrl =
      result.url || `${process.env.IMAGEKIT_URL_ENDPOINT}${result.filePath}`;

    if (!imageUrl) {
      throw new Error("Image URL missing");
    }

    const post = await postmodel.create({
      ImageUrl: imageUrl,
      Caption: caption,
      UserId: req.user._id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Post creation error", error);

    // AI overload handling
    if (error?.error?.code === 503) {
      return res.status(503).json({
        message: "AI service is busy Please try again.",
      });
    }

    // Generic fallback
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = { postController };
