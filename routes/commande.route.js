const express = require('express');
const router = express.Router();
const commandeController= require('../controllers/commande.controller');
const utilisateurController = require('../controllers/utilisateur.controller')



router.post('/', commandeController.commander);
router.post('/adresse/:idUtilisateur/:idAdresse', utilisateurController.addAdresse);

// router.delete('/:id', personneController.delete);

module.exports = router;