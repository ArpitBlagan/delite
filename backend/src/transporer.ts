import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: "arpitblagan27@gmail.com", // Your email address
    pass: process.env.PASSWORD, // Your email password or app-specific password
  },
});
