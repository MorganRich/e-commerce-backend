exports.LigneCommande = class {
    constructor(id, livre, quantitéArticle,  prixTotalLigne) {
        this.id = id;
        this.livre = livre;
        this.quantitéArticle = quantitéArticle;
        this.prixTotalLigne = prixTotalLigne;
    }
}