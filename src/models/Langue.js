var Langue = (function () {
    function Langue() {
    }
    Langue.prototype.getlangue = function () {
        return this._langue;
    };
    Langue.prototype.setlangue = function (value) {
        this._langue = value;
    };
    Langue.prototype.getmatricule = function () {
        return this._matricule;
    };
    Langue.prototype.setmatricule = function (value) {
        this._matricule = value;
    };
    Langue.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    Langue.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    Langue.prototype.getnomClinique = function () {
        return this._nomClinique;
    };
    Langue.prototype.setnomClinique = function (value) {
        this._nomClinique = value;
    };
    return Langue;
}());
export { Langue };
//# sourceMappingURL=Langue.js.map