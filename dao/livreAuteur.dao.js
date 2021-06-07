const connection = require('../database.js');

exports.getAllLivresOfAuteur = (idAuteur) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT l.idLivre, l.titre FROM livre l JOIN livre_auteur la ON la.idLivre = l.idLivre  WHERE idAuteur = ? ", idAuteur, (err, result) => {
            console.log(req.sql)
            err  ? reject(err) : resolve(result);
        });
    });
};


exports.getAuteursOfLivre = (idLivre) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT a.idAuteur, a.nom, a.prenom FROM auteur a JOIN livre_auteur la ON la.idAuteur= a.idAuteur  WHERE idLivre = ? ", idLivre, (err, result) => {
            console.log(req.sql)
            err  ? reject(err) : resolve(result);
        });
    });
};