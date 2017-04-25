var HistDoc = (function () {
    function HistDoc() {
    }
    HistDoc.prototype.getnumDoss = function () {
        return this._numDoss;
    };
    HistDoc.prototype.setnumDoss = function (value) {
        this._numDoss = value;
    };
    HistDoc.prototype.getdate = function () {
        return this._date;
    };
    HistDoc.prototype.setdate = function (value) {
        this._date = value;
    };
    HistDoc.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    HistDoc.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    HistDoc.prototype.getnom = function () {
        return this._nom;
    };
    HistDoc.prototype.setnom = function (value) {
        this._nom = value;
    };
    return HistDoc;
}());
export { HistDoc };
//# sourceMappingURL=HistDoc.js.map