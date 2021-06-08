const express = require('express');
const router = express.Router();
const adresseController= require('../controllers/adresse.controller');


router.get('/', adresseController.getAll);
router.get('/:id', adresseController.getOneById);
router.post('/', adresseController.add);
router.put('/:id', adresseController.edit);
router.delete('/:id', adresseController.delete);

module.exports = router;