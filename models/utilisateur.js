exports.Utilisateur = class {
    constructor(idUtilisateur, nom, prenom, email, motDePasse, adresses, etatCompte) {
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.adresses = adresses;
        this.etatCompte = etatCompte;
    }

}