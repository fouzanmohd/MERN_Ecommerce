const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const shortid = require("shortid");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { createProduct } = require("../controllers/product");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPictures"),
  createProduct
);
// router.get('/product/getproduct')
module.exports = router;
