exports.Commande = class {
    constructor(numCommande,dateCommande,idUtilisateur, prixTotalCommande, lignesCommande, totalCommande, numFacture) {
        this.numCommande = numCommande;
        this.dateCommande = dateCommande;
        this.idUtilisateur = idUtilisateur;
        this.prixTotalCommande = prixTotalCommande;
        this.lignesCommande = lignesCommande;
        this.numFacture = numCommande;
    }

}