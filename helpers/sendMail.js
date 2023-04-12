const sgMail = require("@sendgrid/mail");

const sendMail = async (email, verificationToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: "Verification email address",
    html: `<p>By clicking on the following link, you are confirming your email address.
    <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirm email address</a></p>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail };

///--------------------------nodemailer

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendMail = async (email, verificationToken) => {
//   const { META_EMAIL, META_PASSWORD } = process.env;

//   const nodemailerConfig = {
//     host: "smtp.meta.ua",
//     port: 465,
//     secure: true,
//     auth: {
//       user: META_EMAIL,
//       pass: META_PASSWORD,
//     },
//   };

//   const transport = nodemailer.createTransport(nodemailerConfig);

//   const mail = {
//     to: email,
//     from: META_EMAIL,
//     subject: "Verification email address",
//     html: `<p>By clicking on the following link, you are confirming your email address.
//     <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirm email address</a></p>`,
//   };

//   try {
//     await transport.sendMail(mail);
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = { sendMail };
