const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true //necessário o cadastro de um produto
    },
    price: {
        type: Number,
        required: true,
        min: 0 //não podemos ter valores negativos
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['frutas', 'vegetais', 'hortaliças'] //array vai receber como padrão as strings listadas no enum
    }
})

const Product = mongoose.model('Product', productSchema); //Compilando o Model.
module.exports = Product; //Exportando o módulo para poder usar em outro lugar.  