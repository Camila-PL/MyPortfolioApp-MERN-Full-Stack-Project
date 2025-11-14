import express from "express";

const router = express.Router();

const imageRegex = /\/.+\.(svg|png|jpg|jpeg)$/; // regex para imágenes
const videoRegex = /\/.+\.(mp4|ogv)$/;          // regex para videos

router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/src${filePath}`);
});

router.get(videoRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/src${filePath}`);
});

export default router;
