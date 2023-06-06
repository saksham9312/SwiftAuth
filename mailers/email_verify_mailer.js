const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.emailVerify = (client, token) => {
    console.log('inside emailVerify mailer', client);
    let htmlString = nodeMailer.renderTemplate({client: client, token}, '/email_verify.ejs');
    nodeMailer.transporter.sendMail({
       from: 'saksham271.sg@gmail.com',
       to: client.email,
       subject: "Email Verification",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}