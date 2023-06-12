var accountSid = process.env.TWILIO_ACCOUNT_SID
var authToken = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio')(accountSid,authToken, {
    lazyLoading: true
});

const sendMessage = async function(message, senderID){
    try{
        await twilio.messages.create({
            to: senderID,
            body: message,
            from: 'whatsapp:+14155238886'
        })
    }catch(err){
        console.log("Error in sending message on whatsapp", err);
    }
}

module.exports = {
    sendMessage
}