const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM livre l JOIN article a ON a.reference_article = l.reference_article WHERE a.quantiteEnStock > 0 ORDER BY a.nombreDeconsultation DESC", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};

exports.getOneById = (idLivre) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT l.idLivre, l.numISBN13, l.titre, l.image, l.format, l.reference_article, g.type, au.nom, au.prenom, ar.resume, ar.prixUnitaire, ar.quantiteEnStock FROM livre l JOIN genre g ON l.idGenre = g.idGenre JOIN article ar ON l.reference_article = ar.reference_article JOIN livre_auteur la ON l.idLivre = la.idLivre JOIN auteur au ON la.idAuteur = au.idAuteur WHERE l.idLivre = ?", idLivre, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.getAllByTitle = (titre) => {

    return new Promise((resolve, reject) => {
        let input = '%'.concat(titre.concat('%'));
        const req = connection.query("SELECT l.idLivre, l.titre, l.image, g.type, au.nom, au.prenom, ar.prixUnitaire, ar.quantiteEnStock FROM livre l JOIN genre g ON l.idGenre = g.idGenre JOIN article ar ON l.reference_article = ar.reference_article JOIN livre_auteur la ON l.idLivre = la.idLivre JOIN auteur au ON la.idAuteur = au.idAuteur WHERE l.titre LIKE ?", input, (err, result) => {

            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.getAllByGenre = (id) => {

    return new Promise((resolve, reject) => {

        const req = connection.query("SELECT * FROM livre l join article a on a.reference_article = l.reference_article where idGenre= ?", id, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};




