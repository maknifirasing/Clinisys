var Labo = (function () {
    function Labo() {
    }
    Labo.prototype.getcodeDemande = function () {
        return this._codeDemande;
    };
    Labo.prototype.setcodeDemande = function (value) {
        this._codeDemande = value;
    };
    Labo.prototype.getcontenuePDF = function () {
        return this._contenuePDF;
    };
    Labo.prototype.setcontenuePDF = function (value) {
        this._contenuePDF = value;
    };
    Labo.prototype.getdateDemande = function () {
        return this._dateDemande;
    };
    Labo.prototype.setdateDemande = function (value) {
        this._dateDemande = value;
    };
    Labo.prototype.getmedecinTraitant = function () {
        return this._medecinTraitant;
    };
    Labo.prototype.setmedecinTraitant = function (value) {
        this._medecinTraitant = value;
    };
    Labo.prototype.getnumDossier = function () {
        return this._numDossier;
    };
    Labo.prototype.getnumAdmission = function () {
        return this._numAdmission;
    };
    Labo.prototype.setnumAdmission = function (value) {
        this._numAdmission = value;
    };
    Labo.prototype.setnumDossier = function (value) {
        this._numDossier = value;
    };
    Labo.prototype.getpdf = function () {
        return this._pdf;
    };
    Labo.prototype.setpdf = function (value) {
        this._pdf = value;
    };
    return Labo;
}());
export { Labo };
//# sourceMappingURL=Labo.js.map