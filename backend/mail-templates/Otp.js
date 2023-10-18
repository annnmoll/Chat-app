const otpTemplate = (otp) => {
    return (`
    <h1>ATPL</h1>
    <h2>Account Verification Code</h2>
     
    <p>Thank you for choosing our chatting app as your preferred platform</p>
    <p>To ensure the security of your account, we need to verify your email address. Please find your one-time verification code below:</p>
    <p>Verification Code: <strong>${otp}</strong></p>
    <p>Please use this code to verify your email address within the next 10 minutes. If you did not request this verification, please disregard this email and rest assured that your account remains secure.</p>
    <p>ATPL is committed to providing a safe and seamless learning experience for all our users. If you encounter any issues during the verification process or have any questions about our platform, feel free to reach out to our support team at <a href="mailto:support@studynotion.com">support@studynotion.com</a>.</p>
    <p>Thank you for your cooperation, and we look forward to supporting you on your learning journey.</p>
    <p>Best regards,</p>
   
    <p>ATPL Team</p>
    `)

}


module.exports = otpTemplate ;