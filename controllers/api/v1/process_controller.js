const User = require("../../../modals/users");
const Client = require('../../../modals/clients');
const { sendMessage } = require("../../helper_functions/whatsapp");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

module.exports.checkUser = async function(req,res){
    let {Body, From} = JSON.parse(decodeURIComponent(req.query.data));
    let splitMessage = Body.split('to ');
    let clientName = splitMessage[1].toLowerCase();
    let splitFrom = From.split('91');
    let userNum = splitFrom[1];
    console.log(From);

    try{
        let client = await Client.findOne({name: clientName}).populate('users').populate('config');
        try{
            let user = client.users.find((user) => user.phone == userNum);
            if(!user){
                clientName = clientName.toUpperCase()
                sendMessage(`Sorry\nYou are not registered on ${clientName}.\nPlease Register first`,From);
            }else{
                const token = jwt.sign(user.toJSON(), secretKey, {expiresIn: '1d'} );

                user.lastLogin = new Date();
                await user.save();

                let url = `${client.config.customDomain}${client.config.redirectPage}/${token}`;
                sendMessage(`Please continue on this link.\n${url}`,From);
                res.json(200,{
                    success: true,
                    message: "User Signed In",
                    token: token
                });
            }
        }catch(err){
            console.log(err);
        }

    }catch(err){
        console.log(err);
    }
}

module.exports.registerUser = async function(req, res){
    let client_cred = req.params.credential;
    
    try{
        let client = await Client.findOne({apiKey: client_cred}).populate('users');
        try{
            let isUser = await client.users.find((user) => user.phone == req.body.phone);
            // let user = client.users.find((user) => user.phone == userNum);
            if(!isUser){
                let newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    clientID: client._id
                });
                client.users.push(newUser._id);
                await client.save();
                return res.json(200,{
                    success: true,
                    message: "User Registered",
                    user: newUser
                })
            }
        }catch(err){
            console.log(err);
            return res.json(409,{
                success: false,
                message: "User Already Registered",
            })
        }
    }catch(err){
        console.log(err);
        return res.json(404,{
            message: "Error in finding Client",
            error: err
        })
    }
}

