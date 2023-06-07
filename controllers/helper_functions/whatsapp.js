var accountSid = 'ACe0994609f38a303797380971fd99a80a';
var authToken = '844322b05cef0856d34b638b1d52a911';

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