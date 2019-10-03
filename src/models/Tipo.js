const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const TipoSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tipo', TipoSchema)