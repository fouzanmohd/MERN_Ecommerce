const express = require("express");
const router = express.Router();
const { signup, signin, requireSignin } = require("../controllers/auth");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");

router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/signup", validateSignupRequest, isRequestValidated, signup);

module.exports = router;
