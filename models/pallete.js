const {sequelize, DataTypes, Model} = require('../db');

class Pallete extends Model {
    //do we need pallete methods?
}

Pallete.init({
    // capacity = box limit
    capacity: DataTypes.INTEGER
}, {
    sequelize,
    timestamps: false,
    //do we want timestamps for this app?
});

module.exports = { Pallete };