exports.Commande = class {
    constructor(numCommande, idUtilisateur, dateCommande, lignesCommande, totalCommande, numFacture) {
        this.numCommande = numCommande;
        this.dateCommande = dateCommande;
        this.idUtilisateur = idUtilisateur;
        this.totalCommande = totalCommande;
        this.lignesCommande = lignesCommande;
        this.numFacture = numCommande;
    }

}