const { json } = require("express");
const argon2 = require('argon2');
const utilisateur = require("../models/utilisateur");
const typeAdresse = require("../models/typeAdresse");
const utilisateurDao = require("../dao/utilisateur.dao");
const adresseDao = require("../dao/adresse.dao");
const commandeDao = require("../dao/commande.dao");
const typeAdresseDao = require("../dao/typeAdresse.dao");
const personneAdresseDao = require('../dao/personneAdresse.dao');
const adresse = require('../models/adresse');



exports.getAll = async (req, res, next) => {
    let users = await utilisateurDao.getAll().catch(err => {
        return res.status(500).json({
            error: `problème de récupération de personnes: ${err}`
        })
    });
    for (let u of users) {

        u.adresses = await personneAdresseDao.getAllAdressesOfPersonne(u.idUtilisateur)
            .catch(err => {
                res.status(500).json({
                    error: `problème de récupération d'adresses : ${err}`
                });
            });

        for (let a of u.adresses) {

            a.typeAdresse = await personneAdresseDao.getTypeOfAdresseOfUtilisateur(u.idUtilisateur, a.idAdresse)
                .catch(err => {
                    res.status(500).json({
                        error: `no types found : ${err}`
                    });
                });
        }
    }
    res.status(200).json(users);
}


exports.getOneById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    let user = await utilisateurDao.getOneById(id).catch(err => {
        return res.status(404).json({
            error: `personne avec l'identifiant ${id} non trouvée`
        })
    });
    let p = user[0];
    p.adresses = await personneAdresseDao.getAllAdressesOfPersonne(id)
        .catch(err => {
            res.status(500).json({
                error: `problème de récupération d'adresses : ${err}`
            });
        });
    res.status(200).json(user);

}

exports.add = async (req, res, next) => {
    const p = new utilisateur.Utilisateur(
        req.body.idUtilisateur,
        req.body.nom,
        req.body.prenom,
        req.body.email,
        req.body.motDePasse,
        req.body.adresses,
        req.body.etatCompte
    );
    p.motDePasse = await argon2.hash(req.body.motDePasse)
        .catch(err => {
            return res.status(500).json({
                error: `problème de hashage : ${err}`
            });
        });
    let result = await utilisateurDao.add(p)
        .catch(err => {
            return res.status(500).json({
                error: `problème d'insertion : ${err}`
            });
        });
    p.idUtilisateur = result.insertId;
    console.log(p);
    let i = 1;
    for (let adresse of p.adresses) {
        let res = await adresseDao.add(adresse).catch((err) => {
            return res.status(500).json({
                error: `problème d'insertion dans adresse : ${err}`
            });
        })
        adresse.id = res.insertId;
        await personneAdresseDao.addOneAdresseOfPersonne(p.idUtilisateur, adresse.id, i).catch((err) => {
            return res.status(500).json({
                error: `problème d'insertion dans personne_adresse : ${err}`
            });
        })
        i++;
    }
    return res.status(201).json(p);
}

exports.edit = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const p = new utilisateur.Utilisateur(
        req.body.idUtilisateur,
        req.body.nom,
        req.body.prenom,
        req.body.email,
        req.body.motDePasse,
        req.body.adresses
    );
    console.log(req.body);
    await utilisateurDao.edit(id, p)
        .then(async (result) => {
            console.log(p)
            await personneAdresseDao.deleteByIdPersonne(id)
                .catch(err => {
                    return res.status(500).json({
                        error: `problème de suppression d'adresse : ${err}`
                    });
                });
            let i = 1;
            for (let adresse of p.adresses) {
                if (!adresse.idAdresse) {
                    let res = await adresseDao.add(adresse).catch(err => {
                        return res.status(500).json({
                            error: `problème d'insertion dans adresse: ${err}`
                        });
                    });
                    adresse.idAdresse = res.insertId;
                }   
                await personneAdresseDao.addOneAdresseOfPersonne(p.idUtilisateur, adresse.idAdresse, i).catch((err) => {
                    return res.status(500).json({
                        error: `problème d'insertion dans personne_adresse : ${err}`
                    });
                })
                i++;
            }
            return res.status(202).json(p);
        })
        .catch(err => {
            if (!err) {
                return res.status(404).json({
                    error: `Aucune personne avec l'identifiant ${id}`
                });
            }
            return res.status(500).json({
                error: `problème de modification de personne : ${err}`
            });
        });
}

exports.editAdresseType = (req, res, next) => {
    const idUtilisateur = req.params.idUtilisateur;
    const idAdresse = req.params.idAdresse;
    typeAdresseDao.editAdresseType(idUtilisateur, idAdresse)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json({
                error: `problème de changement de type d'adresses : ${err}`
            });
        });
}

exports.getCommandesByIdPersonne = async (req, res, next) => {
    const id = parseInt(req.params.idUtilisateur);
    let commandes = await commandeDao.getAllByUserId(id)
        .catch(err => {
            res.status(500).json({
                error: `problème de récupération des commandes : ${err}`
            });
        });
    console.log(commandes);
    for (let commande of commandes) {
        console.log(commandes.numCommande);
        commande.lignesCommande = await commandeDao.getAllLignesCommandeByUserId(commande.numCommande)
            .catch(err => {
                res.status(500).json({
                    error: `problème de récupération des lignes des commandes : ${err}`
                });
            });
    }
    console.log(commandes);
    return res.status(201).json(commandes);;
}

exports.getAdressesByIdPersonne = (req, res, next) => {
    const id = parseInt(req.params.idUtilisateur);
    personneAdresseDao.getAllAdressesOfPersonne(id)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json({
                error: `problème de récupération d'adresses : ${err}`
            });
        });
}

exports.getAdresseByIdPersonne = async (req, res, next) => {
    const idUtilisateur = parseInt(req.params.idUtilisateur);
    const idAdresse = parseInt(req.params.idAdresse);
    personneAdresseDao.getOneAdresseOfPersonne(idUtilisateur, idAdresse)
        .then(result => res.status(200).json(result[0]))
        .catch(err => {
            res.status(500).json({
                error: `problème de récupération d'adresses : ${err}`
            });
        });
}

exports.getAdresseOfPersonneByType = async (req, res, next) => {
    const idUtilisateur = parseInt(req.params.idUtilisateur);

    const idType = parseInt(req.params.idType);

    personneAdresseDao.getAdresseOfPersonneByType(idUtilisateur, idType)
        .then(result => res.status(200).json(result[0]))

        .catch(err => {
            res.status(500).json({
                error: `adresse introuvable : ${err}`
            });
        });
}

exports.addAdresse = async (req, res, next) => {
    console.log("adresse controller")
    const a = new adresse.Adresse(
        req.body.idType
    );
    console.log(req.body.idType)
    const idUtilisateur = parseInt(req.params.idUtilisateur);
    const idAdresse = parseInt(req.params.idAdresse);
    personneAdresseDao.addAdresse(idUtilisateur, idAdresse, 2)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(500).json({
                error: `Problème ajout d'adresse : ${err}`
            });
        });

}

