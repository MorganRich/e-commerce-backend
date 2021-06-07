const connection = require('../database.js');


exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM livre", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};


exports.getOneById = (idLivre) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM livre where idLivre= ?", idLivre,(err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};




exports.getAllByTitle = (titre) => {
    return new Promise ((resolve, rejetc) => {
        let input = '%'.concat(titre.concat('%'));
        const req = connection.query("SELECT * FROM livre where titre= ?", input, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};

exports.getAllByGenre = (id) => {
    return new Promise ((resolve, reject) => {
        const req = connection.query("SELECT * FROM livre where idGenre= ?", id, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};




