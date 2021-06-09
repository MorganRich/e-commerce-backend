const express = require('express');
const app = express();
const utilisateur = require('./routes/utilisateur.route');
const connexion = require('./routes/connexion.route');
const livre = require('./routes/livre.route');
const commande = require('./routes/commande.route');



app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/utilisateur', utilisateur);
app.use('/commande', commande);
app.use('/livre', livre);
app.use('/', connexion);
app.get('/*', (req, res) => {
    res
        .status(404)
        .send('Not found');
});

app.listen(3000, () => console.log('Adresse du serveur : http://localhost:3000')
);