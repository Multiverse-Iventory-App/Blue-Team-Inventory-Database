const { TestWatcher } = require('jest');
const {sequelize} = require('./db')
const { Warehouse, Pallete, Box } = require('./index')

describe('Warehouse Datbase', () => {

    beforeAll(async() => {

        await sequelize.sync({force: true});

        const arrayOfWarehouses = [
            ({name: 'Verizon Wireless Warehouse', image: "https://www.prologis.com/sites/corporate/files/styles/768x574_2x/public/images/2019/11/large-agave_lc_2_2.jpg?itok=ITYZuP4o", location: "1641 S Sunkist St., Anaheim, CA 92806, United States", capacity: 800}),
            ({name: 'Verizon Distribution Center', image: "https://www.prologis.com/sites/corporate/files/styles/1440x500_2x/public/images/2019/09/large-ontario_dc9_3_11.jpg?itok=GFwDi0cV", location: "603 Warehouse Park Ln., Knoxville, TN 37932, United States", capacity: 1000}),
            ({name: 'Verizon Fulfillment Center', image: "https://www.prologis.com/sites/corporate/files/styles/768x574_2x/public/images/2019/09/large-mountain_view_ind_park_1_019.jpg?itok=uB5CJssx", location: "1753 Chaplin Dr., Haslet, TX 76052, United States", capacity: 2000})
        ];

        const arrayOfPallets = [
            {capacity: 120},
            {capacity: 500},
            {capacity: 450}
        ];

        const arrayOfBoxes = [
            {item_name: "Apple IPhone 13 Pro", content_QTY: 10},
            {item_name: "Samsung Galaxy A42 5G", content_QTY: 15},
            {item_name: "Google Pixel 6", content_QTY: 20}
        ];

        await Warehouse.bulkCreate(arrayOfWarehouses);
        await Pallete.bulkCreate(arrayOfPallets);
        await Box.bulkCreate(arrayOfBoxes);

    })
// testing warehouse, pallete, and box models
    test('can create warehouse and warehouse can have all properties', async () => {
        const testWarehouse = await Warehouse.findOne({where: {name: 'Verizon Wireless Warehouse'}})
        expect(testWarehouse.id).toBe(1)
        expect(testWarehouse.name).toBe('Verizon Wireless Warehouse')
        expect(testWarehouse.image).toBe("https://www.prologis.com/sites/corporate/files/styles/768x574_2x/public/images/2019/11/large-agave_lc_2_2.jpg?itok=ITYZuP4o")
        expect(testWarehouse.location).toBe("1641 S Sunkist St., Anaheim, CA 92806, United States")
        expect(testWarehouse.capacity).toBe(800)
    })

    test('can create pallete and pallete has all properties', async () => {
        const testPallete = await Pallete.findByPk(2)
        expect(testPallete.id).toBe(2)
        expect(testPallete.capacity).toBe(500)
    })

    test('can create box and box has all properties', async () => {
        const testBox = await Box.findOne({where: {item_name: 'Google Pixel 6'}})
        expect(testBox.id).toBe(3)
        expect(testBox.item_name).toBe('Google Pixel 6')
        expect(testBox.content_QTY).toBe(20)
    })

    //testing associations between models

    test('warehouse can have many palletes', async () => {
        const testWarehouse2 = await Warehouse.findOne({where: {name: "Verizon Fulfillment Center"}})
        const testPallete2 = await Pallete.findByPk(2)
        const testPallete3 = await Pallete.findByPk(3)
        await testWarehouse2.addPallete(testPallete2)
        await testWarehouse2.addPallete(testPallete3)
        const palleteList = await testWarehouse2.getPalletes()
        expect(palleteList.length).toBe(2)
        expect(palleteList[0] instanceof Pallete).toBeTruthy()
        expect(palleteList[1].capacity).toBe(450)
    })

    test('palletes can have many boxes', async () => {
        const testPallete2 = await Pallete.findByPk(2)
        const testBox2 = await Box.findByPk(2)
        const testBox3 = await Box.findByPk(3)
        await testPallete2.addBox(testBox2)
        await testPallete2.addBox(testBox3)
        const boxList = await testPallete2.getBoxes()
        expect(boxList.length).toBe(2)
        expect(boxList[0] instanceof Box).toBeTruthy()
        expect(boxList[1].item_name).toBe("Google Pixel 6")
    })

    afterAll(async() => {
        sequelize.close()
    })
})