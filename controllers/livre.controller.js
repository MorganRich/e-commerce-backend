const { json } = require("express");
const livre = require("../models/livre");
const livreDao = require("../dao/livre.dao");
const genreDao = require("../dao/genre.dao");
const livreAuteurDao = require("../dao/livreAuteur.dao");



exports.getAll = (req, res, next) => {
    let livres = livreDao.getAll()
        .then((result) => {
            res.status(200).json(result[0])
        }).catch(err => {
            return res.status(500).json({
                error: `problème de récupération des livres: ${err}`
            })
        });
}


exports.getOneById = (req, res, next) => {
    const id = parseInt(req.params.id);
    let livre = livreDao.getOneById(id)
        .then((result) => {
            let l = result[0];
            res.status(200).json(l)
        })
        .catch(err => {
            return res.status(404).json({
                error: `Aucun livre avec l'identifiant ${id} trouvé`
            })
        });
}


exports.getAllByGenre = async (req, res, next) => {
    const genre = req.params.genre;
    let genreId = await genreDao.getidGenreByType(genre)
        .catch(err => {
            return res.status(500).json({
                error: `La catégorie ${genre} n'existe pas `
            })
        })
    let livres = await livreDao.getAllByGenre(genreId)
        .catch(err => {
            return res.status(404).json({
                error: `Aucun livre trouvés dans la catégorie ${genre}`
            })
        })
    res.status(200).json(livres[0]);
}


exports.getAllLivreByAuteur = async (req, res, next) => {
    const idAuteur = parseInt(req.params.idAuteur);
    let livres = await livreAuteurDao.getAllLivresOfAuteur(idAuteur)
        .catch(err => {
            return res.status(500).json({
                error: `Aucun livre trouvé pour ${idAuteur}`
            })
        })
    res.status(200).json(livres[0]);
}

exports.getAuteurOfLivre = async (req, res, next) => {
    const idLivre = parseInt(req.params.idLivre);
    console.log(idLivre)
    let auteurs = await livreAuteurDao.getAuteursOfLivre(idLivre)
        .catch(err => {
            return res.status(500).json({
                error: `Auteur introuvable :(`
            })
        })

    res.status(200).json(auteurs[0]);
}