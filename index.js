const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwtVerify = require('./middlewares/jwtVerify');
const cardController = require('./controllers/cardController');
const cardControllerMongo = require('./controllers/cardControllerMongo');
const userController = require('./controllers/userController');

require('dotenv').config();

console.log(process.env.MONGO_DB_CONNECT);
 

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONNECT)
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
app.get('/cards',  cardController.getCards)
// app.get('/cards', jwtVerify, cardController.getCards)
app.get('/cards/:id', cardController.getCard)
app.delete('/cards/:id', cardController.deleteCard);
app.put('/cards/:id', cardController.updateCard);

app.post('/login', userController.login);


// Démarrage du serveur
app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});


