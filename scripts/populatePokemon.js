const pokemon = require('pokemon');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pokemon')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));

  const Card = require('../schema/cards');

  
const populateCards = () => {
    const cards = [];
    for (let i = 0; i < 100; i++) {
        const pokemonName = pokemon.random('fr');
        const pokemonId = pokemon.getId(pokemonName, 'fr');
        const card = new Card({
            name: pokemonName,
            hp: Math.floor(Math.random() * 100),
            cp: Math.floor(Math.random() * 100),
            picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
            type: 'Pokemon type 2',
            description: `${pokemonName} de type Pokémon`,
            trainer: 'Sacha',
        });
        cards.push(card);
    }
    return cards;
}

populateCards().forEach(card => {
    card.save();
});  
