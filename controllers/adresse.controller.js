const { json } = require("express");
const adresse = require("../models/adresse");
const adresseDao = require('../dao/adresse.dao');
const personneAdresseDao = require('../dao/personneAdresse.dao');

exports.getAll = (req, res, next) => {
    adresseDao.getAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
            return res.status(500).json({
                error: `problème de récupération de donnees: ${err}`
            })
        });
}
exports.getOneById = (req, res, next) => {
    const id = parseInt(req.params.idAdresse);
    adresseDao.getOneById(id)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            return res.status(404).json({
                error: `adresse avec l'identifiant ${id} non trouvée`
            });
        });
}
exports.add = (req, res, next) => {
    const a = new adresse.Adresse(
        req.body.idAdresse,
        req.body.typeDeVoie,
        req.body.numRue,
        req.body.codePostal,
        req.body.ville,
        req.body.complement,
    );
    adresseDao.add(a)
        .then(result => {
            a.idAdresse = result.insertId;
            return res.status(201).json(a);
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
}

exports.edit = (req, res, next) => {
    const id = parseInt(req.params.idAdresse);
    const a = new adresse.Adresse(
        req.body.idAdresse,
        req.body.typeDeVoie,
        req.body.numRue,
        req.body.codePostal,
        req.body.ville,
        req.body.complement,
    ); 
    adresseDao.edit(id, a)
        .then(result => {
            return res.status(200).json({
                message: `adresse avec l'identifiant ${id} modifiée avec succès`
            });
        })
        .catch(err => {
            if(!err) {
                return res.status(404).json({ 
                    error: "Id n'existe pas"
                })
            }
            return res.status(500).json({
                error: `problème de mise à jour : ${err}`
            });
        });
}

exports.delete = (req, res, next) => {
    const id = parseInt(req.params.idAdresse);
    personneAdresseDao.deleteByIdAdresse(id)
        .then((result) => {
            adresseDao.delete(id)
                .then(result => {
                    return res.status(200).json({
                        message: `adresse avec l'identifiant ${id} supprimée avec succès`
                    });
                })
                .catch(err => {
                    if (!err) {
                        return res.status(404).json({
                            error: `Aucune adresse avec l'identifiant ${id}`
                        });
                    }
                    return res.status(500).json({
                        error: `problème de suppression : ${err}`
                    });
                });
        })
        .catch(err => {
            return res.status(500).json({
                error: `problème de suppression dans personne_adresse : ${err}`
            });
        })
}