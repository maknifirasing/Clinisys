var SigneClinique = (function () {
    function SigneClinique() {
    }
    SigneClinique.prototype.getdate = function () {
        return this._date;
    };
    SigneClinique.prototype.setdate = function (value) {
        this._date = value;
    };
    SigneClinique.prototype.getdesignation = function () {
        return this._designation;
    };
    SigneClinique.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    SigneClinique.prototype.getquantite = function () {
        return this._quantite;
    };
    SigneClinique.prototype.setquantite = function (value) {
        this._quantite = value;
    };
    return SigneClinique;
}());
export { SigneClinique };
//# sourceMappingURL=SigneClinique.js.map