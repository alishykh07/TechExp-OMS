const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Photo = require("../models/Photo_Model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file" });

    const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;

    const newPhoto = await Photo.create({ imageUrl });

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