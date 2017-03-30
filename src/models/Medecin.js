"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Medecin = (function () {
    function Medecin() {
    }
    Medecin.prototype.getnomMed = function () {
        return this._nomMed;
    };
    Medecin.prototype.setnomMed = function (value) {
        this._nomMed = value;
    };
    Medecin.prototype.getcodMed = function () {
        return this._codMed;
    };
    Medecin.prototype.setcodMed = function (value) {
        this._codMed = value;
    };
    Medecin.prototype.getdesignationSpecialite = function () {
        return this._designationSpecialite;
    };
    Medecin.prototype.setdesignationSpecialite = function (value) {
        this._designationSpecialite = value;
    };
    Medecin.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    Medecin.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return Medecin;
}());
exports.Medecin = Medecin;
