const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express(); // Création de l'application Express

// Configuration de bodyParser pour analyser les données JSON et les données de formulaire
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route GET pour la page d'accueil
app.get('/', (req, res) => {
    // Affichage des en-têtes de requête pour le débogage (à retirer en production)
    console.log("Headers:", req.headers);
    res.send('<h1>Bienvenue sur notre page d\'accueil!</h1>');s
});

const getCards = () => {
    const filePath = 'test.json';

    // Vérification de l'existence du fichier
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');
    }

    // Lecture et analyse des données existantes
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return data;
}


const writeCards = (data, res) => {

    const filePath = 'test.json';
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de l\'écriture du fichier');
        }
        res.status(200).send({
            message: 'Données ajoutées avec succès',
            data: data,
        });
    });

}


// Route POST pour ajouter des données
app.post('/cards', (req, res) => {
    const filePath = 'test.json';

    // Vérification de l'existence du fichier
    // if (!fs.existsSync(filePath)) {
    //     fs.writeFileSync(filePath, '[]');
    // }

    // // Lecture et analyse des données existantes
    // const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const data = getCards();

    // Création d'un nouvel objet à ajouter
    const dataToAdd = {
        name: req.body.name,
        id: crypto.randomUUID(),
    };

    // Ajout de l'objet aux données existantes
    data.push(dataToAdd);

    // Conversion des données en chaîne JSON et écriture dans le fichier
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de l\'écriture du fichier');
        }
        res.status(200).send({
            message: 'Données ajoutées avec succès',
            data: dataToAdd,
        });
    });
});

app.get('/cards', (req, res) => {
    const data = getCards();
    res.send(data);
})

app.get('/cards/:id', (req, res) => {
    const id = req.params.id;
    const data = getCards();
    const card = data.find((card) => {
        console.log("🚀 ~ file: index.js:96 ~ app.get ~ card:", card)
        return card.id === id
    })
    if (!card) {
        return res.status(404).send('Card not found');
    }
    res.send(card);
})

app.delete('/cards/:id', (req, res) => {
const id = req.params.id;
const data = getCards();
const newData = data.filter((card) => card.id !== id);
writeCards(newData, res);
});

app.put('/cards/:id', (req, res) => {
const id = req.params.id;
const data = getCards();
const body = req.body;
const newData = data.map((card) => {
    console.log({...card});
    console.log({...body})
if (card.id === id) {
return {
...card,
...body,
}
}
return card;
})
// console.log(newData);
writeCards(newData, res);

})


// Démarrage du serveur
app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});


