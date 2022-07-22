const nodemailer = require("nodemailer");

const mailConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "tyrell.schuppe@ethereal.email",
    pass: "qH9hsCpf2CHd8nfCUe",
  },
};

module.exports = nodemailer.createTransport(mailConfig);
