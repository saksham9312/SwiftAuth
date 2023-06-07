const Client = require('../modals/clients')
const twilio = require('twilio');
const WA = require('../controllers/helper_functions/whatsapp');

module.exports.checkClient = async function(req, res){
    let message = req.body;
    let {Body, From} = req.body;
    let splitMessage = Body.split('to ');
    let clientName = splitMessage[1].toLowerCase();
    console.log(clientName);

    try{
        let client = await Client.findOne({name: clientName});
        console.log(client);
        if(!client){
            await WA.sendMessage("Platform is not Registered with us!",From);
        }
        else{
            return res.redirect('/v1/api', {
                data: JSON.stringify(message)
                //add credentials of Client as well
            })
        }
    }catch(err){
        console.log("Error in finding client in DB",err);
    }

}
