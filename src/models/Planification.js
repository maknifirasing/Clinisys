var Planification = (function () {
    function Planification() {
    }
    Planification.prototype.getcodeType = function () {
        return this._codeType;
    };
    Planification.prototype.setcodeType = function (value) {
        this._codeType = value;
    };
    Planification.prototype.getdesignation = function () {
        return this._designation;
    };
    Planification.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    Planification.prototype.getdate = function () {
        return this._date;
    };
    Planification.prototype.setdate = function (value) {
        this._date = value;
    };
    Planification.prototype.getheurePrise = function () {
        return this._heurePrise;
    };
    Planification.prototype.setheurePrise = function (value) {
        this._heurePrise = value;
    };
    Planification.prototype.getnum = function () {
        return this._num;
    };
    Planification.prototype.setnum = function (value) {
        this._num = value;
    };
    Planification.prototype.getseuilMax = function () {
        return this._seuilMax;
    };
    Planification.prototype.setseuilMax = function (value) {
        this._seuilMax = value;
    };
    Planification.prototype.getseuilMin = function () {
        return this._seuilMin;
    };
    Planification.prototype.setseuilMin = function (value) {
        this._seuilMin = value;
    };
    Planification.prototype.gettype = function () {
        return this._type;
    };
    Planification.prototype.settype = function (value) {
        this._type = value;
    };
    return Planification;
}());
export { Planification };
//# sourceMappingURL=Planification.js.map