var exports = module.exports = function (user) {
    u = user;
}
var sequelize = require("sequelize");
const express = require('express')
const jsonParser = express.json()
const fs = require("fs")
const bcrypt = require("bcrypt")

exports.graphs = function (req, res) {
    res.render('graphs');
}

exports.reg = function (req, res) {
    res.render('reg');
}

exports.log = function (req, res) {
    res.render('admin');
}

exports.signin = function (req, res) {
    res.render('log');
}

exports.profiles = function (req, res) {
    res.render('profiles');
}

exports.logout = function (req, res) {

    req.session.destroy(function (err) {

        res.redirect('/');

    });

}

exports.home = function (req, res) {
    u.findAll({raw: true}).then(data => {
        res.render('home', {
            users: data
        });
    }).catch(err => console.log(err));
}

exports.check = function (req, res) {
    u.findAll({
        attributes: ['lastname'], raw: true, limit: 1, order: [['id', 'DESC']]
    }).then(function (users) {
        res.json(users[0]["lastname"])
        console.log(users[0]["lastname"])
    }).catch(function (err) {
        console.log(err)
        res.json(err);
    })
}

exports.getid = function (req, res) {
    u.findAll({
        attributes: ['lastname'], raw: true
    }).then(function (users) {
        res.json(users)
        console.log(users)
    }).catch(function (err) {
        console.log(err)
        res.json(err);
    })
}

exports.getidbyid = function (req, res) {
    console.log(req.params.id)
    u.findAll({
        attributes: ['lastname'], where: {lastname: req.params.id}, raw: true
    }).then(function (users) {
        res.json(users[0]["lastname"])
        console.log(users)
    }).catch(function (err) {
        console.log(err)
        res.json(err);
    })
}

exports.getcount = function (req, res) {
    u.findAll({
        raw: true, attributes: ['lastname']
    }).then(function (users) {
        var len = users.length;
        var fake = '';
        for (i = 0; i < len; i++) {
            if (i != len-1) {
                fake = fake+ (users[i]["lastname"]) + ',' } else { fake = fake+ (users[i]["lastname"]) }
        }
        res.json([fake])
    }).catch(function (err) {
        console.log(err)
        res.json(err);
    })
}



