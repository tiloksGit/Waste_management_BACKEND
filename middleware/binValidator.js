const binData = require("../Models/binData");

const validateBin = async (req, res, next) => {
  const { bin_id } = req.headers;
  if (!bin_id) {
    res.status(401).send({ message: "Bin id required for validation" });
    return 0;
  }
  const bin = await binData.findOne({ bin_id }).lean();
  if (!bin) {
    res.status(401).send({ message: "Bin Validation failed" });
  }
  next();
};

module.exports = validateBin;
