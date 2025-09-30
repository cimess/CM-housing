// // utils/emailService.js
// const nodemailer = require("nodemailer");

// async function sendEmail(to, subject, html) {
//   const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",   // ✅ Brevo SMTP
//     port: 587,                      // ✅ TLS port
//     secure: false,                  // MUST be false for port 587
//     auth: {
//       user: process.env.SMTP_USER,  // Brevo SMTP login (e.g. 97f232002@smtp-brevo.com)
//       pass: process.env.SMTP_PASS,  // Brevo Master Password
//     },
//   });

//   const info = await transporter.sendMail({
//     from: `"CM Housing" <${process.env.FROM_EMAIL}>`, // must be a verified sender in Brevo
//     to,
//     subject,
//     html,
//   });

//   console.log("✅ Email sent:", info.messageId);
//   return info;
// }

// module.exports = { sendEmail };

// utils/emailService.js
const nodemailer = require("nodemailer");
require('dotenv').config();
// Create transporter once, reuse it
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // false for port 587, true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"CM Housing" <${process.env.FROM_EMAIL}>`, // verified sender
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
    throw err; // bubble up the error so caller knows
  }
}

module.exports = { sendEmail };

