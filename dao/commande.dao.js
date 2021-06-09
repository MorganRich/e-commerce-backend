const connection = require("../database.js");


exports.getAllByUserId = (idUtilisateur) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM commande WHERE idUtilisateur  = ? ", idUtilisateur, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};


exports.add = (c) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO commande SET dateCommande = (CURDATE()), idUtilisateur = ?", [ c.idUtilisateur], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
            
        });
    });
};


