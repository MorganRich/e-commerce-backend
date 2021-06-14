const connection = require("../database.js");



exports.addLigneCommande = (lc) => {
    return new Promise ((resolve, reject )=> {
        const req = connection.query("INSERT INTO ligne_commande SET quantiteArticle = ?, referenceArticle = ?",[lc.quantiteArticle, lc.livre.reference_article], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
}