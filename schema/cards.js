const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
    },
    hp: {
        type: Number,
        required: [true, 'Les points de vie sont obligatoires'],
    },
    picture: String,
    type: String,
    description: String,
    isShiny: {
        type: Boolean,
        default: false,
    },
    trainer: String,
    affinities: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    spells:[{
        name: String,
        power: Number,
        description: String
    }]
});

module.exports = mongoose.model('Card', cardSchema);
