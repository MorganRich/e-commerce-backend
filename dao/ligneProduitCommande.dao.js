const connection = require("../database.js");


exports.add = (idLigneCommande, idCommande) => {
    return new Promise ((resolve, reject )=> {
        const req = connection.query("INSERT INTO ligne_produit_commande SET id_ligne_commande = ?, id_commande = ?",[idLigneCommande, idCommande], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
}