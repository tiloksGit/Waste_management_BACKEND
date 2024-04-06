const binData = require("../Models/binData");

const getAllBinData = async (req, res) => {
  try {
    await binData
      .find({})
      .exec()
      .then((response) => {
        const data = res.status(200).send({ success: true, data: response });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ success: false, message: err.message });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server Error try again later" });
  }
};

const getBinDataById = async (req, res) => {
  try {
    const { bin_id } = req.headers;
    const bin = await binData.findOne({ bin_id });
    if (!bin) {
      res.status(400).send({ success: false, message: err.message });
      return 0;
    }
    res.status(200).send({ success: true, data: bin });
  } catch {
    res.status(500).send({ message: "Server Error try again later" });
  }
};

const fillBin = async (req, res) => {
  const { fill } = req.body;
  const { bin_id } = req.headers;
  const updatedBin = await binData.updateOne({ bin_id }, { fill });
  console.log(updatedBin);
  if (updatedBin.acknowledged == true) {
    res.status(200);
  }
};
module.exports = { getAllBinData, getBinDataById, fillBin };
