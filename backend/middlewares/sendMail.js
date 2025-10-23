import { createTransport } from "nodemailer";

const sendMail = async (email, subject, otp) => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // ✅ Add this
      auth: {
        user: process.env.Gmail,        // ✅ Must be your Gmail ID
        pass: process.env.Password,     // ✅ Must be App Password, not Gmail password
      },
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>
<body>
    <h2>Your OTP is: ${otp}</h2>
</body>
</html>`;

    await transport.sendMail({
      from: `"Your App Name" <${process.env.Gmail}>`,
      to: email,
      subject,
      html,
    });

    console.log("✅ Email sent successfully to", email);
  } catch (error) {
    console.log("❌ Email sending failed:", error.message);
  }
};

export default sendMail;
