import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true,   // enable nodemailer logging
  debug: true,    // include SMTP traffic in the logs
});

// verify connection configuration at startup
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP verify failed — full error:", err);
  } else {
    console.log("SMTP verify success:", success);
  }
});


export const sendResetEmail = async (to, resetToken) => {
    const resetLink = `${process.env.BASE_URL}/api/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: `"Book Rental" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Password Reset Request",
        html: `
            <p> You requested to reset your password. </p>
            <p> Click the link below to set a new password: <p>
            <a href="${resetLink}">${resetLink}</a>
            <p> <b>This link expires in 15 minutes. </b></p>
        `,
    };
    //await transporter.sendMail(mailOptions);
    try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    // Log the complete error object and helpful fields
    console.error("❌ sendMail failed — full error object:");
    console.error(error);
    if (error.response) console.error("SMTP response:", error.response);
    if (error.code) console.error("Error code:", error.code);
    if (error.responseCode) console.error("Response code:", error.responseCode);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
}

export const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: `"Book Rental" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
    }catch(error) {
        console.error(" Error sending email:", error);
        throw new Error("Email could not be sent");
    }
};