const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwtVerify = require('./middlewares/jwtVerify');
const cardController = require('./controllers/cardController');
const cardControllerMongo = require('./controllers/cardControllerMongo');
const userController = require('./controllers/userController');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pokemon')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));

const app = express(); // Création de l'application Express

// Configuration de bodyParser pour analyser les données JSON et les données de formulaire
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route GET pour la page d'accueil
app.get('/', (req, res) => {
    // Affichage des en-têtes de requête pour le débogage (à retirer en production)
    console.log("Headers:", req.headers);
    res.send('<h1>Bienvenue sur notre page d\'accueil!</h1>');s
});

// Route POST pour ajouter des données
app.post('/cards', cardControllerMongo.postCards);
app.get('/cards',  cardControllerMongo.getCards)
app.get('/cards/hp',  cardControllerMongo.getAverageHpByType)
app.get('/cards/shiny',  cardControllerMongo.updatePokemonShinyStatus)
// app.get('/cards', jwtVerify, cardController.getCards)
app.get('/cards/:id', cardControllerMongo.getCard)
app.post('/cards/:id/affinity', cardControllerMongo.addAffinity)
app.delete('/cards/:id', cardControllerMongo.deleteCard);
app.put('/cards/:id', cardControllerMongo.updateCard);


app.post('/cards/:id/spell', cardControllerMongo.addSpell);
app.delete('/cards/:id/spell/:spellId', cardControllerMongo.deleteSpell);
app.delete('/cards/:id/spellBash/:name', cardControllerMongo.deleteSpellBash);

app.post('/login', userController.login);


// Démarrage du serveur
app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});


