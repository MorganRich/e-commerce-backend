const express = require('express');
const router = express.Router();
const commandeController= require('../controllers/commande.controller');



router.post('/', commandeController.commander);

// router.delete('/:id', personneController.delete);

module.exports = router;