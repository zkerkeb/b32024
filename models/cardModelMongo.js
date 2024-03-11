const Card = require('../schema/cards');


const addCard = (cardData) => {
    const newCard = new Card(cardData);
    return newCard.save();
}

const getCards = async (limit = '10', offset = '0') => {
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);

    // Obtenir le nombre total de cartes
    const totalCount = await Card.countDocuments();

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalCount / limitNum);


    const card = await Card.find().limit(limitNum).skip(offsetNum)

    return {
        data: card,
        totalCount,
        totalPages,
        limit: limitNum,
        offset: offsetNum
    };
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

const getAverageHpByType = async () => {
    try {
        const averageHps = await Card.aggregate([
            {
                $group: {
                    _id: '$type', // Groupe par type de carte
                    averageHp: { $avg: '$hp'}, // Calcule le HP moyen pour chaque groupe
                    minHp: { $min: '$hp'},
                    maxHp: { $max: '$hp'},
                }
            },
            {
                $sort: { averageHp: -1 } // Optionnel : Trie les résultats par HP moyen décroissant
            }
        ]);

        console.log(averageHps);
        return averageHps;
    } catch (err) {
        console.error('Erreur lors de l\'agrégation:', err);
        throw err;
    }
};

const updatePokemonShinyStatus = async () => {
    try {
        // Mise à jour des Pokémon avec plus de 1000 HP
        await Card.updateMany(
            { hp: { $gt: 1000 } }, // Condition: HP > 1000
            { $set: { isShiny: true } } // Action: set isShiny à true
        );

        // Mise à jour des Pokémon avec 1000 HP ou moins
        await Card.updateMany(
            { hp: { $lte: 1000 } }, // Condition: HP <= 1000
            { $set: { isShiny: false } } // Action: set isShiny à false
        );

        console.log('Mise à jour des statuts Shiny effectuée avec succès.');
    } catch (err) {
        console.error('Erreur lors de la mise à jour des statuts Shiny:', err);
        throw err;
    }
};


const deleteCard = async (id) => {
    try {
        const card = await Card.findByIdAndDelete(id);
        console.log("🚀 ~ deleteCard ~ card:", card)
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

const addAffinity = async (cardId, affinityId) => {
    try {
        // Trouver la carte par son ID et ajouter l'ID de l'affinité au tableau des affinités
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            { $addToSet: { affinities: affinityId } }, // Utilise $addToSet pour éviter les doublons
            { new: true } // Retourne le document modifié
        );

        if (!updatedCard) {
            console.error(`Aucune carte trouvée avec l'ID ${cardId}`);
            throw new Error(`Aucune carte trouvée avec l'ID ${cardId}`);
        }

        return updatedCard;
    } catch (error) {
        console.error(`Erreur lors de l'ajout de l'affinité:`, error);
        throw error;
    }
};

const deleteSpellBash = async (cardId, spellName) => {
    try {
        // Trouver la carte par son ID et supprimer le sort du tableau des sorts
        const updatedCard = await
            Card.findByIdAndUpdate(
                cardId,
                { $pull: { spells: { name: spellName } } },
                { new: true } // Retourne le document modifié
            );
        
        if (!updatedCard) {
            console.error(`Aucune carte trouvée avec l'ID ${cardId}`);
            throw new Error(`Aucune carte trouvée avec l'ID ${cardId}`);
        }
        return updatedCard;
    }
    catch (error) {
        console.error(`Erreur lors de la suppression du sort:`, error);
        throw error;
    }
}



const deleteSpell = async (cardId, spellId) => {
    console.log("🚀 ~ deleteSpell ~ spellId:", spellId)
    console.log("🚀 ~ deleteSpell ~ cardId:", cardId)
    try {
        // Trouver la carte par son ID et supprimer le sort du tableau des sorts
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            { $pull: { spells: { _id: spellId } } }, 
            { new: true } // Retourne le document modifié
        );
        if (!updatedCard) {
            console.error(`Aucune carte trouvée avec l'ID ${cardId}`);
            throw new Error(`Aucune carte trouvée avec l'ID ${cardId}`);
        }
        return updatedCard;
    }
    catch (error) {
        console.error(`Erreur lors de la suppression du sort:`, error);
        throw error;
    }
}

const addSpell = async (cardId, spellData) => {
    try {
        // Trouver la carte par son ID et ajouter le sort au tableau des sorts
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            { $push: { spells: spellData } }, 
            { new: true } // Retourne le document modifié
        );
        
        if (!updatedCard) {
            console.error(`Aucune carte trouvée avec l'ID ${cardId}`);
            throw new Error(`Aucune carte trouvée avec l'ID ${cardId}`);
        }
        return updatedCard;
    }
    catch (error) {
        console.error(`Erreur lors de l'ajout du sort:`, error);
        throw error;
    }
}


module.exports = {
    addCard,
    addAffinity,
    getCards,
    getCard,
    deleteCard,
    updateCard,
    getAverageHpByType,
    updatePokemonShinyStatus,
    addSpell,
    deleteSpell,
    deleteSpellBash
};
