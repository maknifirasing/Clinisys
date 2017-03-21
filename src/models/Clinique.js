var Clinique = (function () {
    function Clinique() {
    }
    Clinique.prototype.getcode = function () {
        return this._code;
    };
    Clinique.prototype.setcode = function (value) {
        this._code = value;
    };
    Clinique.prototype.getid = function () {
        return this._id;
    };
    Clinique.prototype.setid = function (value) {
        this._id = value;
    };
    Clinique.prototype.getnom = function () {
        return this._nom;
    };
    Clinique.prototype.setnom = function (value) {
        this._nom = value;
    };
    Clinique.prototype.geturl = function () {
        return this._url;
    };
    Clinique.prototype.seturl = function (value) {
        this._url = value;
    };
    return Clinique;
}());
export { Clinique };
//# sourceMappingURL=Clinique.js.map