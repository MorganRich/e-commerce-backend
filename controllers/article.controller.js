const { json } = require("express");
const article = require("../models/article");
const articleDao = require("../dao/article.dao");


exports.getAll = (req, res, next) => {
    articleDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération des articles: ${err}`
            })
        });
}


exports.getOneByReference = (req, res, next) => {
    const id = parseInt(req.params.referenceArticle);
    articleDao.getOneByReference(id)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            return res.status(404).json({
                error: `article avec l'identifiant ${id} non trouvée`
            });
        });
}


exports.getQuantiteById = (req, res, next) => {
    const id = parseInt(req.params.referenceArticle);
    articleDao.getQuantiteById(id)
    .then(result => res.status(200).json(result[0]))
        .catch(err => {
            return res.status(404).json({
                error: `article avec l'identifiant ${id} non trouvée`
            });
        });
}