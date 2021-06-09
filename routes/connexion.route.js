const express = require('express');
const router = express.Router();
const connexionController = require('../controllers/connexion.controller');


router.post('/connexion', connexionController.connexion);


module.exports = router;