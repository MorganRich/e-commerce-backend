const utilisateur = require("../models/utilisateur");
const utilisateurDao = require('../dao/utilisateur.dao');
const argon2 = require('argon2');


exports.connexion = async (req, res, next) => {


    let user = await utilisateurDao.getOneByEmail(req.body.email)
        .catch(err => {
            return res.status(404).json({
                error: `User not found`
            })
        });

    let u = user[0];
    console.log(user)
    await argon2.verify(u.motDePasse, req.body.motDePasse)
        .then((success) => {
            if (success) {
                console.log(success)
                return res.status(200).json(u)
            } else {
                return res.status(500).json({
                    error: `Probleme d'authentification `
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: `Probleme d'authentification ${err}`
            });
        });

    //     .then( async (result)  => {
    //         if(result.length == 1) {
    //   await argon2.verify(result[0].motDePasse, req.body.motDePasse).then((success) => {
    //         if (success) {
    //             return res.status(200).json(result);
    //         } else {
    //             console.log("error")
    //         }
    //     })

    //          } else {
    //                 return res.status(500).json({
    //                     error: `User not found`
    //                 }) 

    //             }
    //     })
    //     .catch(err => {
    //         return res.status(500).json({
    //             error: `User not found ${err}`
    //         });
    //     });
}


// const checkPassword = (username, password) => {
//     return db.User.find({
//      where: {
//       username: username
//      }
//     })
//     .then(user => {
//      if (user !== null) {
//       return argon2.verify(user.password, password)
//       .catch(() => {
//        throw new Error('Something went wrong. Please try again.')
//       })
//       .then(match => {
//        if (match) {
//         return user
//        }
//       })
//      }
//      return false
//     })
//    }