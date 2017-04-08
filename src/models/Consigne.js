var Consigne = (function () {
    function Consigne() {
    }
    Consigne.prototype.getnumeroDossier = function () {
        return this._numeroDossier;
    };
    Consigne.prototype.setnumeroDossier = function (value) {
        this._numeroDossier = value;
    };
    Consigne.prototype.getcodeMedecin = function () {
        return this._codeMedecin;
    };
    Consigne.prototype.setcodeMedecin = function (value) {
        this._codeMedecin = value;
    };
    Consigne.prototype.gettype = function () {
        return this._type;
    };
    Consigne.prototype.settype = function (value) {
        this._type = value;
    };
    Consigne.prototype.getdatetache = function () {
        return this._datetache;
    };
    Consigne.prototype.setdatetache = function (value) {
        this._datetache = value;
    };
    Consigne.prototype.getdetails = function () {
        return this._details;
    };
    Consigne.prototype.setdetails = function (value) {
        this._details = value;
    };
    Consigne.prototype.getetat = function () {
        return this._etat;
    };
    Consigne.prototype.setetat = function (value) {
        this._etat = value;
    };
    Consigne.prototype.getheurtache = function () {
        return this._heurtache;
    };
    Consigne.prototype.setheurtache = function (value) {
        this._heurtache = value;
    };
    Consigne.prototype.getuserCreate = function () {
        return this._userCreate;
    };
    Consigne.prototype.setuserCreate = function (value) {
        this._userCreate = value;
    };
    Consigne.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    Consigne.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return Consigne;
}());
export { Consigne };
//# sourceMappingURL=Consigne.js.map