const nodeMailer = require('../config/nodemailer');

exports.emailVerify = async(client, token, callback) => {
    console.log('inside emailVerify mailer', client);
    let htmlString = nodeMailer.renderTemplate({client: client, token}, '/email_verify.ejs');
    nodeMailer.transporter.sendMail({
       from: 'swiftauth018@gmail.com',
       to: client.email,
       subject: "Verify your email with SwiftAuth",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            callback(false); // Invoke the callback with false if there's an error
        } else {
            console.log('Message sent', info);
            callback(true); // Invoke the callback with true if the email is sent successfully
        }
    });
};
