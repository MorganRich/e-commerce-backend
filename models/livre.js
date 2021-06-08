exports.Livre = class {
    constructor(idLivre, numISBN13, titre, image, format, idEditeur, idGenre, reference_article) {
        this.idLivre = idLivre;
        this.numISBN13 = numISBN13;
        this.image = image;
        this.format = format;
        this.idEditeur = idEditeur;
        this.idGenre = idGenre;
        this.reference_article = reference_article;
    }

}