const express = require('express');
const router = express.Router();
const articleController= require('../controllers/article.controller');

router.get('/', articleController.getAll);
router.get('/:referenceArticle', articleController.getOneByReference);



module.exports = router;