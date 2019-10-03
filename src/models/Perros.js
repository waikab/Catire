const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const PerrosSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salchicha_id: {
        type: Number,
        required: true
    },
    pan_id: {
        type: Number,
        required: true
    },
    tipo_id: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Perros', PerrosSchema)