// Replace this with actual provider logic (SendGrid, SES, SMTP)
async function sendEmail(to, subject, html) {
  console.log('Pretend sending email to', to);
  console.log('Subject:', subject);
  // TODO: integrate real SMTP or provider. Return true if success.
  return true;
}

module.exports = { sendEmail };
