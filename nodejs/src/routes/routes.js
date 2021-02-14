var Controller = require('../controllers/controllers.js');
const express = require ('express');
const jsonParser = express.json();
module.exports = function(app, passport, urlencodedParser) {

    //Get methods

    app.get('/',  isLoggedIn, Controller.home);
    app.get('/graphs', isLoggedIn, Controller.graphs);
    app.get('/reg', Controller.reg);
    app.get('/login', Controller.log);
    app.get('/signin', Controller.signin)
    app.get('/logout',Controller.logout);
    app.get('/profiles', Controller.profiles)

    //Post methods

    app.post('/login', passport.authenticate('local-signin' ,{
            successRedirect: '/',

            failureRedirect: '/login'
        }

    ));

    app.post('/signin', passport.authenticate('local-signin-user' ,{
            successRedirect: '/profiles',

            failureRedirect: '/signin'
        }

    ));

    app.post('/reg', passport.authenticate('local-signup', {
            successRedirect: '/',

            failureRedirect: '/reg'
        }

    ))

    app.post('/check', Controller.check);
    app.post('/getid', Controller.getid);
    app.post('/getid/:id', Controller.getidbyid);
    app.post('/getcount', Controller.getcount);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/login');

    }
}

