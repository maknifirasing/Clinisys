var Clinique = (function () {
    function Clinique() {
    }
    Clinique.prototype.getcode = function () {
        return this._code;
    };
    Clinique.prototype.setcode = function (value) {
        this._code = value;
    };
    Clinique.prototype.getnom = function () {
        return this._nom;
    };
    Clinique.prototype.setnom = function (value) {
        this._nom = value;
    };
    return Clinique;
}());
export { Clinique };
//# sourceMappingURL=Clinique.js.map