var HistPatient = (function () {
    function HistPatient() {
    }
    HistPatient.prototype.getuser = function () {
        return this._user;
    };
    HistPatient.prototype.setuser = function (value) {
        this._user = value;
    };
    HistPatient.prototype.getsearchText = function () {
        return this._searchText;
    };
    HistPatient.prototype.setsearchText = function (value) {
        this._searchText = value;
    };
    HistPatient.prototype.getetage = function () {
        return this._etage;
    };
    HistPatient.prototype.setetage = function (value) {
        this._etage = value;
    };
    HistPatient.prototype.getdate = function () {
        return this._date;
    };
    HistPatient.prototype.setdate = function (value) {
        this._date = value;
    };
    HistPatient.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    HistPatient.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return HistPatient;
}());
export { HistPatient };
//# sourceMappingURL=HistPatient.js.map