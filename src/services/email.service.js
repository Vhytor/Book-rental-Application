

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    };

    try{
        const info = await transporter.sendEmail(mailOptions);
        console.log("✅ Email sent:", info.response);
    }catch(error) {
        console.error(" Error sending email:", error);
        throw new Error("Email could not be sent");
    }
};