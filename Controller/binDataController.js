const binData = require("../Models/binData");

const getAllBinData = async (req, res) => {
  try {
    await binData
      .find({})
      .select({
        bin_id: true,
        location: true,
        fill: true,
        updatedAt: true,
      })
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

module.exports = { getAllBinData, getBinDataById };
