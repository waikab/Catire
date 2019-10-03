const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const BebidaSchema = new Schema({

    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Bebida', BebidaSchema)