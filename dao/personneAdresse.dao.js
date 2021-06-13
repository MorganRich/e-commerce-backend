const connection = require('../database.js');

exports.getAllAdressesOfPersonne = (idUtilisateur) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT a.idAdresse, typeDeVoie, numRue, codePostal, ville, complement, idType FROM adresse a JOIN utilisateur_adresse pa ON pa.idAdresse = a.idAdresse  WHERE idUtilisateur = ? ", idUtilisateur, (err, result) => {
            console.log(req.sql)
            err  ? reject(err) : resolve(result);
        });
    });
};


exports.getOneAdresseOfPersonne =(idUtilisateur, idAdresse) => {
    return new Promise((resolve, reject ) => {
        const req = connection.query("SELECT a.idAdresse, typeDeVoie, numRue, codePostal, ville, complement FROM adresse a join utilisateur_adresse pa ON pa.idAdresse = a.idAdresse WHERE idUtilisateur = ? and idAdresse =?", [idUtilisateur, idAdresse],(err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });

}

exports.getAdresseOfPersonneByType =(idUtilisateur, idType) => {
    console.log(idType + "" + "dao")
    return new Promise((resolve, reject ) => {
        const req = connection.query("SELECT a.idAdresse, typeDeVoie, numRue, codePostal, ville, complement FROM adresse a join utilisateur_adresse pa ON pa.idAdresse = a.idAdresse WHERE idUtilisateur =? and idType = ?",[idUtilisateur, idType],(err, result) => {
            console.log(req.sql)
           
            err ? reject(err) : resolve(result);
        });
    });

}

exports.getTypeOfAdresseOfUtilisateur =(idUtilisateur, idAdresse) => {
    return new Promise((resolve, reject ) => {
        const req = connection.query("SELECT t.nom FROM type_adresse t join utilisateur_adresse ua ON ua.idType = t.idType WHERE idUtilisateur = ? and idAdresse =?", [idUtilisateur, idAdresse],(err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
}

exports.addAdresse =(idUtilisateur, idAdresse, idType) => {
   console.log(idType)
    return new Promise((resolve, reject) => {
        const req = connection.query("INSERT INTO utilisateur_adresse (idUtilisateur, idAdresse, idType) VALUES (?, ?, ?)", [idUtilisateur, idAdresse, idType], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
}



exports.edit = (idAdresse, idPa) => {
    return new Promise ((resolve, reject) => {
        const req = connexion.query ("UPDATE utilisateur_adresse pa SET idAdresse=? WHERE  pa.id =? ", [idAdresse,idPa], (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        })
    })
}

exports.deleteByIdPersonne = (idUtilisateur) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM utilisateur_adresse WHERE idUtilisateur = ?", idUtilisateur, (err, result) => {
            console.log(req.sql)
            err  ? reject(err) : resolve(result);
        });
    });
};

exports.deleteByIdAdressed = (idAdresse) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM utilisateur_adresse WHERE idAdresse = ?", idAdresse, (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};