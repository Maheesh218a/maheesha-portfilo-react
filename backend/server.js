const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Auth configuration file
const AUTH_FILE = path.join(__dirname, 'auth.json');

// In-memory OTP stores
const otps = {};
const passwordResetOtps = {};

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    res.json(JSON.parse(data));
  });
});

// Update portfolio data
app.post('/api/portfolio', (req, res) => {
  const newData = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save data file' });
    }
    res.json({ message: 'Data saved successfully!' });
  });
});

// Admin Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  let authData = { email: 'maheeshaudalagama@gmail.com', password: 'Maheesha@123vcm' }; // fallback
  try {
    if (fs.existsSync(AUTH_FILE)) {
      authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading auth file', err);
  }

  if (email !== authData.email || password !== authData.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const ADMIN_EMAIL = authData.email;

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP with 5-minute expiry
  otps[email] = {
    code: otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: 'Security Alert: Admin Panel Access Code',
      html: `
        <div style="background-color: #080c10; color: #f0f6fc; padding: 40px; font-family: 'Courier New', Courier, monospace; text-align: center; border: 1px solid #00d4ff; border-radius: 10px;">
          <h2 style="color: #00d4ff; text-transform: uppercase; letter-spacing: 2px;">Admin Access Initiated</h2>
          <p style="color: #a0aec0; margin-bottom: 30px;">A login attempt was made to your portfolio admin panel. Please use the following authorization code to proceed:</p>
          <div style="background-color: #111827; display: inline-block; padding: 20px 40px; border-radius: 8px; border: 1px solid rgba(124, 58, 237, 0.5); font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #00ff88; box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);">
            ${otp}
          </div>
          <p style="color: #ef4444; font-size: 12px; margin-top: 30px;">This code will expire in 5 minutes. If you did not request this, please secure your account.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send OTP email. Make sure your App Password is set in .env' });
  }
});

// Admin Verify Route
app.post('/api/auth/verify', (req, res) => {
  const { email, otp } = req.body;

  const storedData = otps[email];

  if (!storedData) {
    return res.status(400).json({ error: 'OTP request not found or expired' });
  }

  if (Date.now() > storedData.expiresAt) {
    delete otps[email];
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (storedData.code !== otp) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  // OTP is valid
  delete otps[email]; // Clear OTP after successful use
  res.json({ message: 'Verification successful', token: 'admin-auth-token-123' });
});

// Password Change Request Route
app.post('/api/auth/change-password-request', async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  let authData = { email: 'maheeshaudalagama@gmail.com', password: 'Maheesha@123vcm' };
  try {
    if (fs.existsSync(AUTH_FILE)) {
      authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading auth file', err);
  }

  if (oldPassword !== authData.password) {
    return res.status(401).json({ error: 'Incorrect old password' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  passwordResetOtps[authData.email] = {
    code: otp,
    newPassword: newPassword,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: authData.email,
      subject: 'Security Alert: Password Change Verification',
      html: `
        <div style="background-color: #080c10; color: #f0f6fc; padding: 40px; font-family: 'Courier New', Courier, monospace; text-align: center; border: 1px solid #00d4ff; border-radius: 10px;">
          <h2 style="color: #00d4ff; text-transform: uppercase; letter-spacing: 2px;">Password Change Initiated</h2>
          <p style="color: #a0aec0; margin-bottom: 30px;">A request was made to change your admin password. Please use the following code to verify this change:</p>
          <div style="background-color: #111827; display: inline-block; padding: 20px 40px; border-radius: 8px; border: 1px solid rgba(124, 58, 237, 0.5); font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #00ff88; box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);">
            ${otp}
          </div>
          <p style="color: #ef4444; font-size: 12px; margin-top: 30px;">This code will expire in 5 minutes. If you did not request this, please secure your account.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Verification OTP sent to your email' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send OTP email.' });
  }
});

// Password Change Verify Route
app.post('/api/auth/change-password-verify', (req, res) => {
  const { otp } = req.body;

  let authData = { email: 'maheeshaudalagama@gmail.com', password: 'Maheesha@123vcm' };
  try {
    if (fs.existsSync(AUTH_FILE)) {
      authData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading auth file', err);
  }

  const storedData = passwordResetOtps[authData.email];

  if (!storedData) {
    return res.status(400).json({ error: 'Verification request not found or expired' });
  }

  if (Date.now() > storedData.expiresAt) {
    delete passwordResetOtps[authData.email];
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (storedData.code !== otp) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  // OTP is valid, change password
  authData.password = storedData.newPassword;
  
  try {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(authData, null, 2), 'utf8');
    delete passwordResetOtps[authData.email];
    res.json({ message: 'Password changed successfully!' });
  } catch (error) {
    console.error('Error saving new password:', error);
    res.status(500).json({ error: 'Failed to save new password' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
