// controllers/cardController.js
const cardModelMongo = require('../models/cardModelMongo');
// Gère la logique de traitement des requêtes HTTP et envoie les réponses appropriées. Il utilise le modèle pour les opérations de données.

const postCards = async (req, res) => { // Ajout du mot-clé async ici
    try {
        // Assurez-vous que addCard est une fonction asynchrone ou retourne une promesse
        const newCard = await cardModelMongo.addCard(req.body); // Ajout de await ici
        res.status(200).send({
            message: 'Données ajoutées avec succès',
            data: newCard,
        });
    } catch (err) {
        console.log(err);
        // Améliorez la gestion des erreurs en fournissant plus de contexte si possible
        res.status(500).send({ error: 'Erreur lors de l\'ajout des données', details: err.message });
    }
};

module.exports = {
    postCards
};


