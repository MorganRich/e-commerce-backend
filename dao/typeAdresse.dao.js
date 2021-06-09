const connexion = require("../database");

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connexion.query("SELECT * from type_adresse", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });

};


exports.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        const req = connexion.query("SELECT * from type_adresse WHERE idType =?", id, (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });

};


exports.getAllByNom = (nom) => {
    return new Promise((resolve, reject) => {
        const req = connexion.query("SELECT * from type_adresse WHERE nom =?", nom, (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });

};


exports.editAdresseType = (idUtilisateur, idAdresse) => {
    return new Promise ((resolve, reject) => {
        const req = connexion.query ("UPDATE utilisateur_adresse pa SET idType=? WHERE  idUtilisateur =? and idAdresse = ?", [idUtilisateur,idAdresse], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};




