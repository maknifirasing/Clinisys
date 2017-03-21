var AntecCh = (function () {
    function AntecCh() {
    }
    AntecCh.prototype.getidpass = function () {
        return this._idpass;
    };
    AntecCh.prototype.setidpass = function (value) {
        this._idpass = value;
    };
    AntecCh.prototype.getch = function () {
        return this._ch;
    };
    AntecCh.prototype.setch = function (value) {
        this._ch = value;
    };
    return AntecCh;
}());
export { AntecCh };
//# sourceMappingURL=AntecCh.js.map