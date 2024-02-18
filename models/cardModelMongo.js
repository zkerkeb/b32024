const Card = require('../schema/cards');


const addCard = (cardData) => {
    const newCard = new Card(cardData);
    return newCard.save();
}

const getCards = (limit = '10', offset = '0') => {
    return Card.find().limit(parseInt(limit)).skip(parseInt(offset));
}

const getCard = async (id) => {
    try {
        const card = await Card.findById(id);
        return card;
    } catch (error) {
        // Gérez les erreurs potentielles pendant la recherche
        console.error(`Erreur lors de la recherche de la carte avec l'ID ${id}:`, error);
        throw error; // Relancez l'erreur pour la gestion d'erreur externe
    }
}

const deleteCard = async (id) => {
    try {
        const card = await Card.findByIdAndDelete(id);
        return card;
    } catch (error) {
        // Gérez les erreurs potentielles pendant la suppression
        console.error(`Erreur lors de la suppression de la carte avec l'ID ${id}:`, error);
        throw error; // Relancez l'erreur pour la gestion d'erreur externe
    }
}

const updateCard = async (id, cardData) => {
    try {
        const card = await Card
            .findByIdAndUpdate(id, cardData, { new: true });
        return card;
    }
    catch (error) {
        // Gérez les erreurs potentielles pendant la suppression
        console.error(`Erreur lors de la suppression de la carte avec l'ID ${id}:`, error);
        throw error; // Relancez l'erreur pour la gestion d'erreur externe
    }
}




module.exports = {
    addCard,
    getCards,
    getCard,
    deleteCard,
    updateCard
};
