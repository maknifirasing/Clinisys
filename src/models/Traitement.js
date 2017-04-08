var Traitement = (function () {
    function Traitement() {
    }
    Traitement.prototype.getdesignation = function () {
        return this._designation;
    };
    Traitement.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    Traitement.prototype.getjour = function () {
        return this._jour;
    };
    Traitement.prototype.setjour = function (value) {
        this._jour = value;
    };
    Traitement.prototype.getposologie = function () {
        return this._posologie;
    };
    Traitement.prototype.setposologie = function (value) {
        this._posologie = value;
    };
    return Traitement;
}());
export { Traitement };
//# sourceMappingURL=Traitement.js.map