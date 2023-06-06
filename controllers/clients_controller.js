const Client = require('../modals/clients')
const jwt = require('jsonwebtoken');
const emailVerifyMailer = require('../mailers/email_verify_mailer');

module.exports.create = async function(req, res){
    try{
        let client = await Client.findOne({email: req.body.email});
        console.log(req.body);
        if(!client){
            Client.create({
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                country: req.body.country
            })
            console.log("Client Added in DB");
            let client = await Client.findOne({email: req.body.email});
            const token = jwt.sign(client.toJSON(), 'swift', {expiresIn: '1d'} )
            emailVerifyMailer.emailVerify(client,token);
            return res.redirect('back');
        }
        console.log("Client already exists in DB!");
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports.signup = function(req, res){

    return res.render('client_signup')
}

module.exports.emailVerify = async function(req,res){
    try{
        const decoded = jwt.verify(req.params.token, 'swift');
        // const filter = {id: client.id};
        // console.log(filter);
        const id = decoded._id
        let result = await Client.findByIdAndUpdate(
            id.toString(),
            {verified: true},
            {new: true}
        )
        console.log("Email Verified!", result);

    }catch(err){
        console.log(err);
        return;
    }
    return res.redirect('/');
}
