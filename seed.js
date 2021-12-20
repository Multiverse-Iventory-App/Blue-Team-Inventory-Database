const {sequelize} = require('./db');

const {Warehouse, Pallete, Box} = require('./index');

const seedWarehouses = [
    ({name: 'Verizon Wireless Warehouse', image: "https://www.prologis.com/sites/corporate/files/styles/768x574_2x/public/images/2019/11/large-agave_lc_2_2.jpg?itok=ITYZuP4o", location: "1641 S Sunkist St., Anaheim, CA 92806, United States", capacity: 800}),
    ({name: 'Verizon Distribution Center', image: "https://www.prologis.com/sites/corporate/files/styles/1440x500_2x/public/images/2019/09/large-ontario_dc9_3_11.jpg?itok=GFwDi0cV", location: "603 Warehouse Park Ln., Knoxville, TN 37932, United States", capacity: 1000}),
    ({name: 'Verizon Fulfillment Center', image: "https://www.prologis.com/sites/corporate/files/styles/768x574_2x/public/images/2019/09/large-mountain_view_ind_park_1_019.jpg?itok=uB5CJssx", location: "1753 Chaplin Dr., Haslet, TX 76052, United States", capacity:2000})
];

const seedPalletes = [
    {capacity: 120 , WarehouseId: 1},
    {capacity: 500 , WarehouseId: 2},
    {capacity: 450 , WarehouseId: 3}
];

const seedBoxes = [
    {item_name: "Apple IPhone 13 Pro" , content_QTY: 10, PalleteId: 1},
    {item_name: "Samsung Galaxy A42 5G" , content_QTY: 15, PalleteId: 2},
    {item_name: "Google Pixel 6" , content_QTY: 20, PalleteId: 3}
];

const seed = async () => {
    try {
        await sequelize.sync({force: true})
        await Warehouse.bulkCreate(seedWarehouses, {validate: true})
        await Pallete.bulkCreate(seedPalletes, {validate: true})
        await Box.bulkCreate(seedBoxes, {validate: true})
        console.log('seeding success!')
        sequelize.close()
    } catch (error) {
        console.log('SOMETHING WENT WRONG WITH SEEDING: ', error)
    }
}

seed()
    .then(() => {
        console.log('seeding success!')
    })
    .catch(err => {
        console.error('oh no! Something went wrong!')
        console.log(err)
    })