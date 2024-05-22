const { createTransport } = require("nodemailer")
const ejs = require('ejs');
const { readFileSync } = require("fs");
const path = require("path");
require('dotenv').config();
/**
 * Sends the verification email to the user
 * @param {string} as 
 * @param {string} to 
 * @param {string} otp 
 */
const sendVerificationEmail = async (to, otp, displayName) => {
    try {
        /**
         * Nodemailer transport
         */
        const transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
        /**
         * EJS template
         */
        const template = readFileSync(path.join(__dirname, 'emaillayout.ejs'), 'utf-8');
        let html = ejs.render(template, {
            displayName,
            otp
        });
        /**
         * Send the verification email
         */
        await transporter.sendMail({
            from: `Mew <${process.env.NODEMAILER_EMAIL}>`,
            to,
            subject: "Mew - OTP Verification",
            html
        })
    } catch (error) {
        
    }
}

module.exports = sendVerificationEmail