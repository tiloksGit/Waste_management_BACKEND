const express = require("express");
const router = express.Router();
const binValidator = require("../middleware/binValidator");
const Controller = require("../Controller/binDataController");
const mailController = require("../middleware/notificationMiddleware");
router.route("/setup").post(binValidator);
router.route("/fill").post(binValidator,mailController, Controller.fillBin);

module.exports = router;
