var port = process.env.PORT
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const fs = require("fs")
const mysql = require('mysql2')
var path = require("path");
var config = require(path.join(__dirname, 'config.json'))
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
var passport = require('passport');
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "hbs")
app.set('views', './src/views')
var models = require("./src/models")
require('./src/controllers/controllers.js')(models.user);
require(path.join(__dirname, 'passport.js'))(passport, models.user);
require('./src/routes/routes.js')(app, passport, urlencodedParser)
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine')
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
})
//_______________________________________________
app.listen(port, () => {
  console.log(port);
})
