exports.LigneCommande = class {
    constructor(id, article, quantitéArticle,  prixTotalLigne) {
        this.id = id;
        this.article = article;
        this.quantitéArticle = quantitéArticle;
        this.prixTotalLigne = prixTotalLigne;
      
    }

}