const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const secretKey = process.env.JWT_SECRET;

const Client = require('../modals/clients');

let opts = {
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter(),
    secretOrKey: secretKey
}

passport.use(new JWTStrategy(opts, async function(jwtPayLoad, done){

    try{
        console.log("JWT");
        let client = await Client.findOne({id: jwtPayLoad.id});
        console.log(client); 
        if(client){
            return done(null,client);
        }else{
            return done(null,false);
        }

    }
    catch(err){
        console.log("Error in finding client from JWT");
    }
}))
module.exports = passport;