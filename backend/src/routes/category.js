const express = require("express");
const router = express.Router();
const { addCategory, getCategory } = require("../controllers/category");
const { requireSignin, adminMiddleware } = require("../common-middleware");

router.post("/category/create", requireSignin, adminMiddleware, addCategory);
router.get("/category/getcategory", getCategory);
module.exports = router;
