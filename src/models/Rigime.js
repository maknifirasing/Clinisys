/**
 * Created by makni on 16/02/2017.
 */
var Rigime = (function () {
    function Rigime() {
    }
    Rigime.prototype.getcodeRegime = function () {
        return this._codeRegime;
    };
    Rigime.prototype.setcodeRegime = function (value) {
        this._codeRegime = value;
    };
    Rigime.prototype.getdesignation = function () {
        return this._designation;
    };
    Rigime.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    return Rigime;
}());
export { Rigime };
//# sourceMappingURL=Rigime.js.map