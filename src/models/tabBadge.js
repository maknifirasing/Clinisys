var tabBadge = (function () {
    function tabBadge() {
    }
    tabBadge.prototype.getnumDoss = function () {
        return this._numDoss;
    };
    tabBadge.prototype.setnumDoss = function (value) {
        this._numDoss = value;
    };
    tabBadge.prototype.getFichierT = function () {
        return this._FichierT;
    };
    tabBadge.prototype.setFichierT = function (value) {
        this._FichierT = value;
    };
    tabBadge.prototype.getFichier = function () {
        return this._Fichier;
    };
    tabBadge.prototype.setFichier = function (value) {
        this._Fichier = value;
    };
    tabBadge.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    tabBadge.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return tabBadge;
}());
export { tabBadge };
//# sourceMappingURL=tabBadge.js.map