const nodemailer = require("nodemailer");
const binData = require("../Models/binData");

const mailController = async (req, res, next) => {
  const { fill } = req.body;
  const { bin_id } = req.headers;
  console.log("Passed through mailer");
  if (!fill || fill < 80) {
  } else {
    const bin = await binData.findOne({ bin_id });
    if (!bin) {
      res.status(404).send("Bin not found");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "smart_waste_disposal_system@hotmail.com",
        pass: "Hotmail123@",
      },
    });

    const options = {
      from: "smart_waste_disposal_system@hotmail.com",
      to: "tilakthexp@gmail.com",
      subject: "Smart bin update notification",
      text: `Dear Waste Pickup operator,
            Please pickup the bin with bin_id : ${bin_id}
            location: ${bin.location},
            coordinates: ${bin.latitude}, ${bin.longitude}
            bin level : ${fill}
        `,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.response);
      }
    });
  }
  next();
};

module.exports = mailController;
