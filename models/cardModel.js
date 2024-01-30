// models/cardModel.js
const fs = require('fs');
const crypto = require('crypto');
const filePath = 'test.json';

//S'occupe des opérations de données (lecture et écriture dans le fichier JSON). La logique de manipulation des données est isolée ici pour faciliter la maintenance et les tests.

const getCards = () => {
    // lire le fichier et retourner les données
    let data = [];
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(fileData);
    } catch (err) {
        console.error(err);
    }
    return data;
};

const addCard = (cardData) => {
    const data = getCards();
    const dataToAdd = { id: crypto.randomUUID(), ...cardData };
    data.push(dataToAdd);

    try {
        fs.writeFileSync(filePath, JSON.stringify(data));
        return dataToAdd;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getCard = (id) => {
    const data = getCards();
    const card = data.find((card) => card.id === id);
    return card;
}

const deleteCard = (id) => {
    const data = getCards();
    const newData = data.filter((card) => card.id !== id);
    if (newData.length === data.length) {
        throw new Error('Card not found');
    }
    try {
        fs.writeFileSync(filePath, JSON.stringify(newData));
        return newData;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const updateCard = (id, cardData) => {
    const data = getCards();
    const card = data.find((card) => card.id === id);
    const updatedCard = { ...card, ...cardData };
    const newData = data.map((card) => card.id === id ? updatedCard : card);
    try {
        fs.writeFileSync(filePath, JSON.stringify(newData));
        return newData;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    getCards,
    addCard,
    getCard,
    deleteCard,
    updateCard
};
