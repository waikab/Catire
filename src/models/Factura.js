const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const FacturaSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    sucursal_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Factura', FacturaSchema)