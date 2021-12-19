const {sequelize, DataTypes, Model} = require('../db');

class Warehouse extends Model {
    //do we need any methods?
}

Warehouse.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    //capacity = pallete limit
    capacity: DataTypes.INTEGER
}, {
    sequelize,
    //do we want timestamps for this app?
    timestamps:false,
});

module.exports = { Warehouse };