const express = require("express");
const router = express.Router();
const { default: upload } = require("../middlewares/uploadMiddleware");
const { uploadOnCloudinary } = require("../cloudinary/Cloudinary");

const Photo = require("../models/Photo_Model");

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file" });

    const image = await uploadOnCloudinary(
      req.file.buffer,
      "Office-Management-System/office-gallery"
    );

    const newPhoto = await Photo.create({ imageUrl: image.url });

    res.json(newPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-images", async (req, res) => {
  const data = await Photo.find().sort({ createdAt: -1 });
  res.json(data);
});

router.delete("/delete-image/:id", async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
