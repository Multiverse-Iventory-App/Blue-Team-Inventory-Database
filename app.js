//Express
const express = require("express");
const app = express()
const port = 3000

//allow express to read json request bodies
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Handlebars
const { check, validationResult } = require('express-validator');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const handlebars = expressHandlebars({
    handlebars : allowInsecurePrototypeAccess(Handlebars)
})

//Imports
const {sequelize} = require('./db');
const {Box, Pallete, Warehouse} = require('./index')


const path = require('path');
const { json } = require("body-parser");
app.use(express.static('public'));

app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars')

const warehouseChecks = [
    check('name').not().isEmpty().trim().escape(),
    check('image').isURL(),
    check('name').isLength({ max: 50 })
]

app.get('/warehouses', async (req, res) => {
    const allWarehouse = await Warehouse.findAll();
    res.render('warehouses', {allWarehouse}) 
});

app.get('/warehouses/:id', async (req, res) => {
    const warehouse = await Warehouse.findByPk(req.params.id, {include: {
            model: Pallete,
            include: Box
        }
    });
    console.log(warehouse);
    res.render("warehouse", {warehouse});
});

app.post('/warehouse', warehouseChecks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await Warehouse.create(req.body);
    res.sendStatus(201);
});

app.delete('/warehouse/:id', async (req, res) => {
    await Warehouse.destroy({
        where: {
            id: req.params.id
        }
    });
    res.sendStatus(200);
});

app.put('/warehouse/:id', warehouseChecks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const warehouse = await Warehouse.findByPk(req.params.id);
    await warehouse.update(req.body);
    res.sendStatus(200);
});

//pallete
app.get('/pallete', async (req, res) => {
    const allPallete = await Pallete.findAll();
    res.render('pallete', {allPallete}) 
});

app.get('/pallete/:id', async (req, res) => {
    const pallete = await Pallete.findByPk(req.params.id, {include: {
        model: Box
        }
    });
    console.log(pallete)
    res.render('pallete', {pallete}) 
});

//added id 
app.get('/new-pallete/:id', async (req, res) => {
    const id = req.params.id
    res.render('newPalleteForm', {id})
})

//new pallete form
app.post('/new-pallete/:id', async (req,res) =>{
console.log(req.body);
    const newPallete = await Pallete.create({"capacity": req.body.capacity, "WarehouseId": req.params.id})  
    let palleteAlert = `${(newPallete.capacity)} added to your database`
    const foundPallete = await Pallete.findByPk(newPallete.id)
    if(foundPallete){
        res.redirect(`/warehouses/${foundPallete.WarehouseId}`)
        //res.render('newPalleteForm',{})
    } else {
        palleteAlert = 'Failed to add Pallete'
        res.render('newPalleteForm',{palleteAlert})
    }

})

//DELETE method,  Deletes a pallete from db.sqlite
app.delete('/pallete/:id', async (req,res)=>{
    const deletedPallete = await Pallete.destroy({
        where: {id:req.params.id}
    })
    res.send(deletedPallete ? 'Deleted' : 'Deletion Failed')
})

app.put('/pallete/:id', async (req,res) => {
    let updatedPallete = await Pallete.update(req.body, {
        where: {id: req.params.id}
    })
    const pallete = await Pallete.findByPk(req.params.id)
    res.render('palletes', {pallete})
})


//box
app.get('/box', async (req, res) => {
    const allBox = await Box.findAll();
    res.render('boxes', {allBox}) 
});


app.post('/new-box', async (req,res) =>{

    const newBox = await Box.create(req.body)

    let boxAlert = `${newBox.name} added to your database`
    
    const foundBox = await Box.findByPk(newBox.id)
    if(foundBox){
        res.render('newBoxForm',{boxAlert})
    } else {
        boxAlert = 'Failed to add Pallete'
        res.render('newBoxForm',{boxAlert})
    }
})
//DELETE method,  Deletes a pallete from db.sqlite
app.delete('/box/:id', async (req,res)=>{
    const deletedBox = await Box.destroy({
        where: {id:req.params.id}
    })
    res.send(deletedBox ? 'Deleted' : 'Deletion Failed')
})

app.put('/box/:id', async (req,res) => {
    let updatedBox = await Box.update(req.body, {
        where: {id: req.params.id}
    })
    const box = await Box.findByPk(req.params.id)
    res.render('boxes', {box})
})

app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`)
})