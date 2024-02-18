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

const getCards = async (req, res) => {
    const {limit, offset} = req.query;
    try {
        const data = await cardModelMongo.getCards(limit, offset);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Erreur lors de la récupération des données', details: err.message });
    }
}

const getCard = async (req, res) => {
    try {
        const data = await cardModelMongo.getCard(req.params.id);
        if (!data) {
            return res.status(404).send({ error: 'Aucune carte trouvée' });
        }
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Erreur lors de la récupération des données', details: err.message });
    }
}

const deleteCard = async (req, res) => {
    try {
        const data = await cardModelMongo.deleteCard(req.params.id);
        if (!data) {
            return res.status(404).send({ error: 'Aucune carte trouvée' });
        }
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Erreur lors de la suppression des données', details: err.message });
    }
}

const updateCard = async (req, res) => {
    try {
        const data = await cardModelMongo.updateCard(req.params.id, req.body);
        if (!data) {
            return res.status(404).send({ error: 'Aucune carte trouvée' });
        }
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Erreur lors de la mise à jour des données', details: err.message });
    }
}

module.exports = {
    postCards,
    getCards,
    getCard,
    deleteCard,
    updateCard
};


