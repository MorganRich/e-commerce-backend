const connection = require('../database.js');


exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM livre l join article a on a.reference_article = l.reference_article", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};


exports.getOneById = (idLivre) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM livre l join article a on a.reference_article = l.reference_article where idLivre= ?", idLivre,(err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.getAllByTitle = (titre) => {
    return new Promise ((resolve, rejetc) => {
       let input = '%'.concat(titre.concat('%'));
        const req = connection.query("SELECT l.idLivre, l.titre, l.image, g.type, au.nom, au.prenom, ar.prixUnitaire, ar.quantiteEnStock FROM livre l JOIN genre g on l.idGenre = g.idGenre JOIN article ar on l.reference_article = ar.reference_article JOIN livre_auteur la on l.idLivre = la.idLivre JOIN auteur au on la.idAuteur = au.idAuteur WHERE l.titre LIKE ?", input, (err, result) => {
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.getAllByGenre = (id) => {
    return new Promise ((resolve, reject) => {
        const req = connection.query("SELECT * FROM livre l join article a on a.reference_article = l.reference_article where idGenre= ?", id, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};




