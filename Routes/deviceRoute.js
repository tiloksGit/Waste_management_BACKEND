const express = require("express");
const router = express.Router();
const binValidator = require("../middleware/binValidator");

router.route("/setup").post(binValidator);
router.route("/fill").post(binValidator);

module.exports =router;