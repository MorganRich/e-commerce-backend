exports.Article = class {
    constructor(reference_article, nom, resume, prixUnitaire, quantiteEnStock, nombreDeConsultation) {
        this.reference_article = reference_article;
        this.nom = nom;
        this.resume = resume;
        this.prixUnitaire = prixUnitaire;
        this.quantiteEnStock = quantiteEnStock;
        this.nombreDeConsultation = nombreDeConsultation;
       
    }

}