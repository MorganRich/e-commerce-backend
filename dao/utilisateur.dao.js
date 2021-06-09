const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM utilisateur", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};

exports.getOneById = (idUtilisateur) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM utilisateur WHERE idUtilisateur  = ? ", idUtilisateur, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};


exports.add = (p) => {
   
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO utilisateur SET nom = ?, prenom = ?, email = ?, motDePasse = ?", [p.nom, p.prenom, p.email, p.motDePasse], (err, result) => {
                console.log(req.sql)
                err ? reject(err) : resolve(result);
            });
    });
};

exports.edit = (id, p) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE utilisateur SET nom= ?, prenom = ? WHERE idUtilisateur = ?", [p.nom, p.prenom, id], (err,result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });

};
exports.delete = (idUtilisateur) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM personne WHERE idUtilisateur = ?", idUtilisateur, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.getOneByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM utilisateur WHERE email  = ?", email, (err, result) => {
            console.log(req.sql)
            err || result.length == 0  ? reject(err) : resolve(result);
        });
    });
};

exports.getOneByUsernameAndPassword = (email, motDePasse) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM utilisateur WHERE email  = ? AND motDePasse = ? ", [email, motDePasse], (err, result) => {
            console.log(req.sql)
            err || result.length == 0  ? reject(err) : resolve(result);
        });
    });
};

