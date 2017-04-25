var Evenement = (function () {
    function Evenement() {
    }
    Evenement.prototype.getnumdoss = function () {
        return this._numdoss;
    };
    Evenement.prototype.setnumdoss = function (value) {
        this._numdoss = value;
    };
    Evenement.prototype.getevenements = function () {
        return this._evenements;
    };
    Evenement.prototype.setevenements = function (value) {
        this._evenements = value;
    };
    Evenement.prototype.getdate = function () {
        return this._date;
    };
    Evenement.prototype.setdate = function (value) {
        this._date = value;
    };
    Evenement.prototype.getdetail = function () {
        return this._detail;
    };
    Evenement.prototype.setdetail = function (value) {
        this._detail = value;
    };
    Evenement.prototype.getuserCreat = function () {
        return this._userCreat;
    };
    Evenement.prototype.setuserCreat = function (value) {
        this._userCreat = value;
    };
    return Evenement;
}());
export { Evenement };
//# sourceMappingURL=Evenement.js.map