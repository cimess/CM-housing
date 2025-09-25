const nodemailer = require("nodemailer");

async function sendEmail(to, subject, html) {
  // Create a test account (only needed once per run)
  const testAccount = await nodemailer.createTestAccount();

  // Create transporter using Ethereal SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: testAccount.user, // generated user
      pass: testAccount.pass, // generated password
    },
  });

  // Send the email
  const info = await transporter.sendMail({
    from: '"Dev App" <no-reply@app.com>', // sender
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = { sendEmail };
