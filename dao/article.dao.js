const connection = require('../database.js');


exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM article", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};


exports.getOneByReference = (referenceArticle) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM article where reference_article= ?", referenceArticle,(err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};


exports.getPrixByReference = (referenceArticle) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT prixUnitaire FROM article where reference_article= ?", referenceArticle,(err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};


exports.getQuantiteById = (referenceArticle) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT quantiteEnStock FROM article where reference_article= ?", referenceArticle,(err, result) => {
            console.log(req.sql)
            err  ? reject(err) : resolve(result);
        });
    });

}


