const {sequelize, DataTypes, Model} = require('../db');

class Box extends Model {
    //do we need any box methods?
}

Box.init({
    item_name: DataTypes.STRING,
    content_QTY: DataTypes.INTEGER
}, {
    sequelize,
    timestamps: false,
});

module.exports = { Box };