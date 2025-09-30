const nodemailer = require("nodemailer");

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // MUST be false for 587
    auth: {
      user: "97f232002@smtp-brevo.com", // your Brevo SMTP login
      pass: '' // the master password from Brevo
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"CM Housing" <cm-housing@cmhousing.com.ng>', // must match your verified sender domain/email in Brevo
      to: "cimessthemanofvalor@gmail.com",
      subject: "Test Email from Brevo",
      html: "<h1>Hello from Brevo SMTP 🚀</h1>",
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

sendEmail();
