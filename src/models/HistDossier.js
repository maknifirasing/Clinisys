var HistDossier = (function () {
    function HistDossier() {
    }
    HistDossier.prototype.getnumDoss = function () {
        return this._numDoss;
    };
    HistDossier.prototype.setnumDoss = function (value) {
        this._numDoss = value;
    };
    HistDossier.prototype.getdate = function () {
        return this._date;
    };
    HistDossier.prototype.setdate = function (value) {
        this._date = value;
    };
    HistDossier.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    HistDossier.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return HistDossier;
}());
export { HistDossier };
//# sourceMappingURL=HistDossier.js.map