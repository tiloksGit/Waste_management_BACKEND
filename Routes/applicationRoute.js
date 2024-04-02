const express = require("express");
const router = express.Router();
const binValidator = require("../middleware/binValidator");
const Controller = require("../Controller/binDataController");
const BinController = require("../Controller/binRegisterController");

router.route("/bin/all").get(Controller.getAllBinData);
router.route("/bin/id").get(binValidator, Controller.getBinDataById);
router.route("/bin/add").post(BinController.addNewBin);

module.exports = router;
