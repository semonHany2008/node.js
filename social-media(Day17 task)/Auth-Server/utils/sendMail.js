const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
  tls:{rejectUnauthorized:false}
});

const mailSender=(to, subject, text)=>{
    const mailOptions={
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        text:text
    }
    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("email sent: "+info.response);
        }
    })
}

module.exports=mailSender;