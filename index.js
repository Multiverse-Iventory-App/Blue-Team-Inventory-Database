const {sequelize, DataTypes, Model} = require('./db');

const { Warehouse } = require('./models/warehouse');
const { Pallete } = require('./models/pallete');
const { Box } = require('./models/box');
const { Menu } = require('../../restaurant-sequelize-project/restaurant-sequelize-/menu');

Pallete.belongsTo(Warehouse);
Warehouse.hasMany(Pallete);

Box.belongsTo(Pallete);
Pallete.hasMany(Box);

module.exports = {Warehouse, Pallete, Box, sequelize};