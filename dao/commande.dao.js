const connection = require("../database.js");

exports.getAllByUserId = (idUtilisateur) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT numCommande, dateCommande, prixTotalCommande FROM commande WHERE idUtilisateur = ? ", idUtilisateur, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.getAllLignesCommandeByUserId = (numCommande) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT lc.quantiteArticle, lc.prixTotalLigne, l.titre, au.nom, au.prenom FROM commande c JOIN ligne_produit_commande lpc ON lpc.id_commande = c.numCommande JOIN ligne_commande lc ON lc.id = lpc.id_ligne_commande JOIN livre l ON l.reference_article = lc.referenceArticle JOIN livre_auteur la ON l.idLivre = la.idLivre JOIN auteur au ON la.idAuteur = au.idAuteur WHERE numCommande = ? ", numCommande, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.add = (c) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO commande SET dateCommande = (CURDATE()), idUtilisateur = ?, prixTotalCommande =?", [c.idUtilisateur, c.prixTotalCommande], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};


