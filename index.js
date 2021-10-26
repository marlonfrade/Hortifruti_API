const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('Mongo Connection Open!!')
    })

    .catch(err => {
        console.log('Mongo Connection Error');
        console.log(err);
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configurando o middleware do express
app.use(express.urlencoded({
    extended: true
}))

//npm i method-override (pacote npm)
app.use(methodOverride('_method'))

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/style', express.static('style'));


app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', {
        products
    });
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {
        product
    })
})

app.get('/products/:id/edit', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {
        product
    })
})

app.put('/products/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('on port 3000');
})