const express = require('express');
const router = express.Router();
const utilisateurController= require('../controllers/utilisateur.controller');

router.get('/', utilisateurController.getAll);
router.get('/:id', utilisateurController.getOneById);
router.get('/:idUtilisateur/adresses', utilisateurController.getAdressesByIdPersonne);
router.get('/:idUtilisateur/adresses/:idAdresse', utilisateurController.getAdresseByIdPersonne);
router.get('/commande/adresse/:idUtilisateur', utilisateurController.getBillingAdresseOfPersonneByType);
router.post('/', utilisateurController.add);
router.put('/:id', utilisateurController.edit);
router.put('/:idUtilisateur/adresses/:idAdresse', utilisateurController.editAdresseType);
// router.delete('/:id', personneController.delete);

module.exports = router;