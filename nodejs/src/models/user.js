module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        age: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        weight: {
            type: Sequelize.STRING,
            notEmpty: true
        },


        serial: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        password: {
            type: Sequelize.STRING
        }

    });

    return User;

}
