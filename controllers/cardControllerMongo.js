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
    // peux gerer les requete mal formater
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


const updatePokemonShinyStatus = async (req, res) => {
    try {
        // Mise à jour des Pokémon avec plus de 1000 HP
        const data = await cardModelMongo.updatePokemonShinyStatus();
        console.log(data)
        res.status(200).send(data);
        console.log('Mise à jour des statuts Shiny effectuée avec succès.');
    } catch (err) {
        console.error('Erreur lors de la mise à jour des statuts Shiny:', err);
        res.status(500).send({ error: 'Erreur lors de la mise à jour des statuts Shiny', details: err.message });
        throw err;
    }
}

const getAverageHpByType = async (req, res) => {
    try {
        const data = await cardModelMongo.getAverageHpByType();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Erreur lors de la récupération des données', details: err.message });
    }
}


const addSpell = async (req, res) => {
    try {
        const cardId = req.params.id; // L'ID de la carte à laquelle ajouter un sort
        const spellData = req.body; // Les données du sort à aj
        // Assurez-vous que le sort existe (vous pourriez vouloir vérifier dans la base de données ici)
        // Ajout du sort à la carte
        const updatedCard = await cardModelMongo.addSpell(cardId, spellData);
        if (!updatedCard) {
            return res.status(404).send({ error: 'Aucune carte trouvée ou mise à jour échouée' });
        }
        res.status(200).send(updatedCard);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Erreur lors de l'ajout du sort", details: err.message });
    }
};

const deleteSpellBash = async (req, res) => {
    try {
        const cardId = req.params.id; // L'ID de la carte à laquelle supprimer un sort
        const spellName = req.params.name; // L'ID du sort à supprimer
        // Assurez-vous que le sort existe (vous pourriez vouloir vérifier dans la base de données ici)
        // Suppression du sort de la carte
        const updatedCard = await cardModelMongo.deleteSpellBash(cardId, spellName);
        if (!updatedCard) {
            return res.status(404).send({ error: 'Aucune carte trouvée ou mise à jour échouée' });
        }
        res.status(200).send(updatedCard);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Erreur lors de la suppression du sort", details: err.message });
    }
}

const deleteSpell = async (req, res) => {
    try {
        const cardId = req.params.id; // L'ID de la carte à laquelle supprimer un sort
        const spellId = req.params.spellId; // L'ID du sort à supprimer
        // Assurez-vous que le sort existe (vous pourriez vouloir vérifier dans la base de données ici)
        // Suppression du sort de la carte
        const updatedCard = await cardModelMongo.deleteSpell(cardId, spellId);
        if (!updatedCard) {
            return res.status(404).send({ error: 'Aucune carte trouvée ou mise à jour échouée' });
        }
        res.status(200).send(updatedCard);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Erreur lors de la suppression du sort", details: err.message });
    }

}


const addAffinity = async (req, res) => {
    try {
        const cardId = req.params.id; // L'ID de la carte à laquelle ajouter une affinité
        const { affinityId } = req.body; // L'ID de la carte avec laquelle créer une affinité

        // Assurez-vous que l'affinité existe (vous pourriez vouloir vérifier dans la base de données ici)

        // Ajout de l'affinité à la carte
        const updatedCard = await cardModelMongo.addAffinity(cardId, affinityId);

        if (!updatedCard) {
            return res.status(404).send({ error: 'Aucune carte trouvée ou mise à jour échouée' });
        }

        res.status(200).send(updatedCard);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Erreur lors de l'ajout de l\'affinité", details: err.message });
    }
};



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
    addAffinity,
    deleteCard,
    updateCard,
    getAverageHpByType,
    updatePokemonShinyStatus,
    addSpell,
    deleteSpell,
    deleteSpellBash
};


