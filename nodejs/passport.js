//load bcrypt
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport, user) {


    var User = user;

    var LocalStrategy = require('passport-local').Strategy;


    passport.use('local-signup', new LocalStrategy(

        {

            usernameField: 'serial',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },



        function(req, serial, password, done) {

            var generateHash = function(password) {

                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            };



            User.findOne({
                where: {
                    serial: serial
                }
            }).then(function(user) {

                if (user)

                {

                    return done(null, false, {
                        message: 'That serial is already taken'
                    });

                } else

                {

                    var userPassword = generateHash(password);

                    var data =

                        {
                            serial: serial,

                            password: userPassword,

                            firstname: req.body.firstname,

                            lastname: req.body.lastname,

                            age: req.body.age,

                            weight: req.body.weight

                        };

                    User.create(data).then(function(newUser, created) {

                        if (!newUser) {

                            return done(null, false);

                        }

                        if (newUser) {

                            return done(null, newUser);

                        }

                    });

                }

            });

        }

    ));
    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });
    // deserialize user
    passport.deserializeUser(function(id, done) {

        User.findByPk(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'serial',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function(req, serial, password, done) {

            var User = user;

            var isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }

            User.findOne({
                where: {
                    serial: 'admin'
                }
            }).then(function(user) {

                if (!user) {

                    return done(null, false, {
                        message: 'Serial does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }


                var userinfo = user.get();
                return done(null, userinfo);


            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }

    ));

    passport.use('local-signin-user', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'serial',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function(req, serial, password, done) {

            var User = user;

            var isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }

            User.findOne({
                where: {
                    serial: serial
                }
            }).then(function(user) {

                if (!user) {

                    return done(null, false, {
                        message: 'Serial does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }


                var userinfo = user.get();
                return done(null, userinfo);


            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }

    ));

}