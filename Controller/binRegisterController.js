const binData = require("../Models/binData");

const addNewBin = async (req, res) => {
  try {
    const { bin_id, location, lat, lon, manufacturer } = req.body;
    if (!bin_id || !location || !lat || !lon || !manufacturer) {
      res.status(400).send({ message: "All fields are required" });
      return;
    }

    const newBinTuple = {
      bin_id,
      location,
      latitude: lat,
      longitude: lon,
      manufacturer,
    };
    const duplicate = await binData.findOne({ bin_id }).lean();
    if (duplicate) {
      res
        .status(409)
        .send({ success: false, message: "bin_id already assigned" });
      return;
    }
    const dbResponse = await binData
      .create(newBinTuple)
      .then((response) => {
        res.status(201).send({ success: true, message: response });
      })
      .catch((err) => {
        res.status(400).send({ success: false, message: err.message });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Server error try again later" });
  }
};

const removeBin = async (req, res) => {
  const { bin_id } = req.params;
  const bin = await binData.findOne({ bin_id }).lean();
  if (!bin) {
    res.status(404).send({ success: false, message: "bin_id not available" });
    return 0;
  }
  const deletedBin = await binData.deleteOne({ bin_id });
  res.status(200).send({ success: true, message: deletedBin });
  return 1;
};
module.exports = { addNewBin, removeBin };
