const express = require("express");
const router = express.Router();
const { addCategory, getCategory } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../common-middleware");

const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });

router.post("/category/create", requireSignin, adminMiddleware,upload.single('categoryImage'), addCategory);
router.get("/category/getcategory", getCategory);
module.exports = router;
