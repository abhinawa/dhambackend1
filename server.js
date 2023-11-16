const express = require('express');
require("dotenv").config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
console.log("hello")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to allow only requests from http://localhost:3000
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Add other CORS headers if needed

  next();
});

// Your Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@mydhamyatra.com',
    pass: 'noReplyNoPassword@MyDhamYatra1',
  },
  connectionTimeout: 5000,
  socketTimeout: 5000,
});

// Your /send-email endpoint
app.post('/send-email', async (req, res) => {
  // Your existing code

  const { to, subject, text } = req.body;
  // Email options
  const mailOptions = {
    from: "noreply@mydhamyatra.com",
    to,
    subject,
    text,
  };
  console.log(req.body);



  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email: ' + error.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
