// controllers/cardController.js
const cardModel = require('../models/cardModel');
// Gère la logique de traitement des requêtes HTTP et envoie les réponses appropriées. Il utilise le modèle pour les opérations de données.

const postCards = (req, res) => {
    try { 
        const newCard = cardModel.addCard(req.body);
        res.status(200).send({
            message: 'Données ajoutées avec succès',
            data: newCard,
        });
    } catch (err) {
        res.status(500).send('Erreur lors de l\'écriture du fichier');
    }
};

const getCards = (req, res) => {
    const data = cardModel.getCards();
    res.status(200).send(data);
}

const getCard = (req, res) => {
    const id = req.params.id;
    const card = cardModel.getCard(id);
    if (!card) {
        return res.status(404).send('Card not found');
    }
    res.send(card);
}

const deleteCard = (req, res) => {
    const id = req.params.id;
    const cardExists = cardModel.getCard(id);
    if (!cardExists) {
        return res.status(404).send('Card not found');
    }
    try {
        const data = cardModel.deleteCard(id);
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send('Erreur lors de l\'écriture du fichier');
    }
}

const updateCard = (req, res) => {
    const id = req.params.id;
    const cardExists = cardModel.getCard(id);
    if (!cardExists) {
        return res.status(404).send('Card not found');
    }
    try {
        const data = cardModel.updateCard(id, req.body);
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send('Erreur lors de l\'écriture du fichier');
    }
}

module.exports = {
    postCards,
    getCards,
    getCard,
    deleteCard,
    updateCard
};
