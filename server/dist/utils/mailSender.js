"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailSender = async (email, otp) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODE_MAILER_USER,
                pass: process.env.NODE_MAILER_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from: `"Sky Scanner" <${process.env.NODE_MAILER_USER}>`,
            to: email,
            subject: "Verify your email to start exploring with Sky Scanner",
            html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <div style="text-align: center;">
            <img src="https://your-skyscanner-domain.com/logo.png" alt="Sky Scanner Logo" style="width: 120px; margin-bottom: 20px;" />
            <h2 style="color: #007BFF;">Email Verification</h2>
          </div>
          <p>Hello Traveler,</p>
          <p>Welcome to <strong>Sky Scanner</strong> – your gateway to discovering the best flight and travel deals. Use the OTP code below to verify your email address and unlock your journey:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 26px; letter-spacing: 5px; font-weight: bold; color: #007BFF;">${otp}</span>
          </div>
          <p>If you didn’t request this, feel free to ignore this email.</p>
          <p style="margin-top: 40px;">Safe travels,<br/>The Sky Scanner Team ✈️</p>
          <hr style="margin-top: 40px;" />
          <p style="font-size: 12px; color: gray;">This message was sent to ${email}. If you didn’t request it, no further action is needed.</p>
        </div>
      `,
            text: `Your OTP code is ${otp}. If you didn’t request this, just ignore this email.`,
        });
        return info;
    }
    catch (err) {
        console.log("Error sending Sky Scanner OTP email:", err);
        throw new Error("Failed to send OTP email");
    }
};
exports.mailSender = mailSender;
//# sourceMappingURL=mailSender.js.map