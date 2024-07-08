import nodemailer from 'nodemailer';
// import twilio from 'twilio';

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// export const sendOTP = async (phone, otp) => {
//     // Send OTP via Twilio or any SMS gateway
//     const accountSid = 'your_account_sid';
//     const authToken = 'your_auth_token';
//     const client = new twilio(accountSid, authToken);

//     await client.messages.create({
//         body: `Your OTP is ${otp}`,
//         from: 'your_twilio_number',
//         to: phone,
//     });
// };

export const sendOTP = async (email, otp) => {

    const user = process.env.NODEMAILER_USER;
    const pass = process.env.NODEMAILER_PASS;

    // Send OTP via email
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: pass
        }
    });

    const mailOptions = {
        from: '"NoteBox" <lifetechworld56@gmail.com>',
        to: email,
        subject: 'OTP for NoteBox',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <h2 style="color: #333;">Hello,</h2>
                <h3 style="color: #333;">Your One-Time Password (OTP) for NoteBox authentication is:</h3>
                <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 5px; padding: 10px; margin-top: 10px; width:auto; text-align: center; ">
                    <h3 style="color: #333; font-size: 24px; margin: 0; letter-spacing: 2px;">${otp}</h3>
                </div>
                <p style="color: #333; margin-top: 20px;">Please use this OTP to complete the authentication process.</p>
                <p style="color: #333;">If you didn't request this OTP, please ignore this email.</p>
                <p style="color: #333; font-weight: bold;">Best regards,<br/>NoteBox Team</p>
            </div>
            `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email: ' + error);
    }
};
