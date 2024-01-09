const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const app = express(); // create express app
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json()); // application du middleware body-parser


app.get('/', (req, res) => {
    console.log("🚀 ~ file: index.js:7 ~ app.get ~ req:", req.headers)
    res.send('Bienvenue sur notre page d\'accueil!');
});

app.post('/',  (req, res) => {

    const testExist = fs.existsSync('test.json');

    if (!testExist) {
        fs.writeFileSync('test.json', '[]', function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
          }
        );
    } 

    const data =  JSON.parse(fs.readFileSync('test.json', 'utf8')) 
    if (data) {

        console.log('CECI EST LA DATA', data)
    }

    const dataToAdd = {
        name: req.body.name,
        id: crypto.randomUUID(),
    }

    data.push(dataToAdd)
    console.log("🚀 ~ file: index.js:40 ~ app.post ~ dataArray:", data)

    const dataToJson = JSON.stringify(data);

    fs.writeFile('test.json', dataToJson, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');

      }
    );
    res.status(200).send('C la route post');

});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});