var Consigne = (function () {
    function Consigne() {
    }
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
    Consigne.prototype.getdate = function () {
        return this._date;
    };
    Consigne.prototype.setdate = function (value) {
        this._date = value;
    };
    Consigne.prototype.getheurtache = function () {
        return this._heurtache;
    };
    Consigne.prototype.setheurtache = function (value) {
        this._heurtache = value;
    };
    Consigne.prototype.getdetails = function () {
        return this._details;
    };
    Consigne.prototype.setdetails = function (value) {
        this._details = value;
    };
    Consigne.prototype.getuserCreate = function () {
        return this._userCreate;
    };
    Consigne.prototype.setuserCreate = function (value) {
        this._userCreate = value;
    };
    Consigne.prototype.getid = function () {
        return this._id;
    };
    Consigne.prototype.setid = function (value) {
        this._id = value;
    };
    Consigne.prototype.getlistCode = function () {
        return this._listCode;
    };
    Consigne.prototype.setlistCode = function (value) {
        this._listCode = value;
    };
    Consigne.prototype.getNumeroDossier = function () {
        return this._NumeroDossier;
    };
    Consigne.prototype.setNumeroDossier = function (value) {
        this._NumeroDossier = value;
    };
    Consigne.prototype.getcodeMedecin = function () {
        return this._codeMedecin;
    };
    Consigne.prototype.setcodeMedecin = function (value) {
        this._codeMedecin = value;
    };
    Consigne.prototype.getetat = function () {
        return this._etat;
    };
    Consigne.prototype.setetat = function (value) {
        this._etat = value;
    };
    return Consigne;
}());
export { Consigne };
//# sourceMappingURL=Consigne.js.map