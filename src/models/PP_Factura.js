const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const PPFacturaSchema = new Schema({
    factura_id: {
        type: Number,
        required: true
    },
    pprecio_id: {
        type: Number,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('PPFactura', PPFacturaSchema)