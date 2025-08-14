const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async ({ to, subject, text, html, from }) => {
  const info = await transporter.sendMail({
    from: from || `No-Reply <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
  return info;
};

exports.verifyTransport = async () => {
  try {
    await transporter.verify();
    console.log("✅ Mail transporter is ready");
  } catch (err) {
    console.error("❌ Mail transporter failed:", err.message);
  }
};
