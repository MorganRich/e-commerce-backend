const express = require('express');
const router = express.Router();
const livreController= require('../controllers/livre.controller');

router.get('/', livreController.getAll);
router.get('/:id', livreController.getOneById);
router.get('/genre/:genre', livreController.getAllByGenre);
router.get('/auteur/:idAuteur', livreController.getAllLivreByAuteur);
router.get('/auteur/livre/:idLivre', livreController.getAuteurOfLivre);


module.exports = router;