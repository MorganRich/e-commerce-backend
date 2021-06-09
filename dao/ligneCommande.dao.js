const connection = require("../database.js");



exports.addLigneCommande = (lc) => {
    return new Promise ((resolve, reject )=> {
        const req = connection.query("INSERT INTO ligne_commande SET quantiteArticle = ?, referenceArticle = ?",[lc.quantiteArticle, lc.referenceArticle], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
}