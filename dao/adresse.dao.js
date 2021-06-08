const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM adresse", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM adresse WHERE idAdresse = ? ", id, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.add = (a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO adresse SET typeDeVoie = ?,numRue = ?, codePostal = ?, ville = ?, complement=?", [a.typeDeVoie, a.rue, a.codePostal, a.ville, a.complement], (err, result) => {
                console.log(req.sql)
                err ? reject(err) : resolve(result);
            });
    });
};
exports.edit = (id, a) => {
   
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE adresse SET ? WHERE idAdresse = ?", [a, id], (err,result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });

};
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM adresse WHERE  idAdresse = ?", id, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0  ? reject(err) : resolve(result);
        });
    });
};