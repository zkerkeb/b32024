const Card = require('../schema/cards');


const addCard = (cardData) => {
    const newCard = new Card(cardData);
    return newCard.save();
}



module.exports = {
    addCard
};
