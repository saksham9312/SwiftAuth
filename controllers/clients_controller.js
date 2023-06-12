const Client = require('../modals/clients')
const jwt = require('jsonwebtoken');
const emailVerifyMailer = require('../mailers/email_verify_mailer');
const querystring = require('querystring');
const uuid = require("uuid");
const secretKey = process.env.JWT_SECRET;

module.exports.create = async function(req, res){
    try{
        let isClient = await Client.findOne({email: req.body.email});
        console.log(req.body);
        if(!isClient){
            let newClient = await Client.create({
                apiKey: uuid.v4(),
                name: req.body.name.toLowerCase(),
                email: req.body.email,
                contact: req.body.contact,
                country: req.body.country
            })
            console.log("Client Added in DB");
            // client = await Client.findOne({email: req.body.email});
            console.log(newClient);
            const token = jwt.sign(newClient.toJSON(), secretKey, {expiresIn: '1d'} );
            const data = {
              email: req.body.email,
              emailStatus: null // Placeholder value
          };
          const emailVerifyPromise = new Promise((resolve) => {
            emailVerifyMailer.emailVerify(newClient, token, (success) => {
                console.log(success);
                data.emailStatus = success;
                resolve();
            });
        });
        await emailVerifyPromise;
        console.log(data);
        const queryParams = querystring.stringify(data);
        return res.redirect(`/client/email-sent?${queryParams}`);
        }else{
          console.log("Client already exists in DB!");
          return res.redirect('/client/signin');
        }

    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports.signup = function(req, res){

    return res.render('client_signup')
}

module.exports.emailSent = function(req, res){
  const email = req.query.email;
  const emailStatus = req.query.emailStatus;
  return res.render('email_confirmation',{
    email: email,
    emailStatus: emailStatus
  })
}

module.exports.signin = function(req, res){

  return res.render('client_login')
}

module.exports.emailVerify = async function(req,res){
    try{
        const decoded = jwt.verify(req.params.token, secretKey);
        // const filter = {id: client.id};
        // console.log(filter);
        const id = decoded._id
        let result = await Client.findByIdAndUpdate(
            id.toString(),
            {verified: true},
            {new: true}
        )
        console.log("Email Verified!", result);
        return res.redirect('/client/dashboard/setup/'+req.params.token);
    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.redirect('/client/signup')
        }
        console.log(err);
    }
}

module.exports.dashboardSetup = async function(req, res) {
  try {
    jwt.verify(req.params.token, secretKey, async function(err, decoded) {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).json({
            message: 'Token Expired!'
          });
        } else {
          return res.status(401).json({
            message: 'Token Invalid!'
          });
        }
      } else {
        console.log(decoded);
        // Fetch the client from the database using the decoded data
        try {
          let client = await Client.findOne({ email: decoded.email });
          if (!client) {
            // Handle client not found error
            return res.status(404).json({
              message: 'Client not found!'
            });
          }
          // Update the decoded object with the latest verified status
          decoded.verified = client.verified;
          
          return res.render('dashboard_cred', { data: decoded, token: req.params.token, clientName: decoded.name.toUpperCase() });
        } catch (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Internal Server Error'
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

module.exports.dashboardHistory = async function(req,res){
  try{
    const token = req.query.token;
    const credential = req.query.credential;
    let client = await Client.findOne({apiKey: credential}).populate('users');
    console.log(client.users);
    return res.render('dashboard_history',{
      token: token,
      credential: credential,
      userData: client.users,
      clientName: client.name.toUpperCase()
    });
  }catch(err){
    console.log(err);
  }
}

  


