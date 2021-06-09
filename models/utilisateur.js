exports.Utilisateur = class {
    constructor(idUtilisateur, nom, prenom, email, motDePasse, etatCompte, adresses) {
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.etatCompte = etatCompte;
        this.adresses = adresses;
    }

}