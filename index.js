const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(passport.initialize());
app.use(express.urlencoded());
app.use(express.static('./assets'));
// app.use(expressLayouts);
// // extract style and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});