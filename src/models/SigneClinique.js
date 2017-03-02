"use strict";
var SigneClinique = (function () {
    function SigneClinique() {
    }
    SigneClinique.prototype.getcodeType = function () {
        return this._codeType;
    };
    SigneClinique.prototype.setcodeType = function (value) {
        this._codeType = value;
    };
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
exports.SigneClinique = SigneClinique;
