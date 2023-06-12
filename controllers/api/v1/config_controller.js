const Client = require('../../../modals/clients')
const Config = require('../../..//modals/config');

module.exports.setConfig = async function(req,res){

    let credential = req.query.credential;
    const {customDomain, redirectPage} = req.body;

    try{
        let client = await Client.findOne({apiKey: credential}).populate('config');
        let config = client.config
        if(client){
            if(config){
                config.customDomain = customDomain
                config.redirectPage = redirectPage
            }else{
                config = new Config({apiKey: credential, customDomain: customDomain, redirectPage: redirectPage});
            }
            await config.save();
            client.config = config;
            await client.save();

            return res.status(200).json({ message: 'Configurations updated successfully' });
        }

    }catch(err){
        console.error('Error updating configuration:', err);
        return res.status(500).json({ error: 'An error occurred while updating the settings' });
    }
}

  


