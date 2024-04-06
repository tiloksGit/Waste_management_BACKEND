const express = require("express");
const router = express.Router();
const binValidator = require("../middleware/binValidator");
const Controller = require("../Controller/binDataController");
router.route("/setup").post(binValidator);
router.route("/fill").post(binValidator, Controller.fillBin);

module.exports = router;
