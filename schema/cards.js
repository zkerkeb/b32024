const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
    },
    hp: {
        type: Number,
        required: [function() {
            return this.name; // Rend le champ "age" obligatoire si "isAdult" est true
          }, 'Les points de vie sont obligatoires'],
    },
    picture: String,
    type: String,
    description: String,
    trainer: String
});

module.exports = mongoose.model('Card', cardSchema);
