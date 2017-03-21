var Evenement = (function () {
    function Evenement() {
    }
    Evenement.prototype.getaccess = function () {
        return this._access;
    };
    Evenement.prototype.setaccess = function (value) {
        this._access = value;
    };
    Evenement.prototype.getcode = function () {
        return this._code;
    };
    Evenement.prototype.setcode = function (value) {
        this._code = value;
    };
    Evenement.prototype.getevenements = function () {
        return this._evenements;
    };
    Evenement.prototype.setevenements = function (value) {
        this._evenements = value;
    };
    Evenement.prototype.getorderEvenement = function () {
        return this._orderEvenement;
    };
    Evenement.prototype.setorderEvenement = function (value) {
        this._orderEvenement = value;
    };
    Evenement.prototype.getvisible = function () {
        return this._visible;
    };
    Evenement.prototype.setvisible = function (value) {
        this._visible = value;
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
    Evenement.prototype.getIDEvenement = function () {
        return this._IDEvenement;
    };
    Evenement.prototype.setIDEvenement = function (value) {
        this._IDEvenement = value;
    };
    Evenement.prototype.getnumdoss = function () {
        return this._numdoss;
    };
    Evenement.prototype.setnumdoss = function (value) {
        this._numdoss = value;
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