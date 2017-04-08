var ExamenRadio = (function () {
    function ExamenRadio() {
    }
    ExamenRadio.prototype.getcompterendu = function () {
        return this._compterendu;
    };
    ExamenRadio.prototype.setcompterendu = function (value) {
        this._compterendu = value;
    };
    ExamenRadio.prototype.getdateExamen = function () {
        return this._dateExamen;
    };
    ExamenRadio.prototype.setdateExamen = function (value) {
        this._dateExamen = value;
    };
    ExamenRadio.prototype.getdesignationExamen = function () {
        return this._designationExamen;
    };
    ExamenRadio.prototype.setdesignationExamen = function (value) {
        this._designationExamen = value;
    };
    ExamenRadio.prototype.getnumeroDossier = function () {
        return this._numeroDossier;
    };
    ExamenRadio.prototype.setnumeroDossier = function (value) {
        this._numeroDossier = value;
    };
    ExamenRadio.prototype.getobserv = function () {
        return this._observ;
    };
    ExamenRadio.prototype.setobserv = function (value) {
        this._observ = value;
    };
    return ExamenRadio;
}());
export { ExamenRadio };
//# sourceMappingURL=ExamenRadio.js.map