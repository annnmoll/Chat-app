const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: 'Go Food', 
            to: email, // list of receivers
            subject: title, // Subject line
            html: body
          });
    } catch (e) {
        console.log(e.message);
    }
};


module.exports = mailSender ;