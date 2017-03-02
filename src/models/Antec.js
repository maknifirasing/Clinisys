"use strict";
var Antec = (function () {
    function Antec() {
    }
    Antec.prototype.getcodeAntecedent = function () {
        return this._codeAntecedent;
    };
    Antec.prototype.setcodeAntecedent = function (value) {
        this._codeAntecedent = value;
    };
    Antec.prototype.getcodeFamille = function () {
        return this._codeFamille;
    };
    Antec.prototype.setcodeFamille = function (value) {
        this._codeFamille = value;
    };
    Antec.prototype.getdesignation = function () {
        return this._designation;
    };
    Antec.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    Antec.prototype.getidDetailAntec = function () {
        return this._idDetailAntec;
    };
    Antec.prototype.setidDetailAntec = function (value) {
        this._idDetailAntec = value;
    };
    Antec.prototype.getordre = function () {
        return this._ordre;
    };
    Antec.prototype.setordre = function (value) {
        this._ordre = value;
    };
    Antec.prototype.getvisiblePreAnes = function () {
        return this._visiblePreAnes;
    };
    Antec.prototype.setvisiblePreAnes = function (value) {
        this._visiblePreAnes = value;
    };
    Antec.prototype.getid = function () {
        return this._id;
    };
    Antec.prototype.setid = function (value) {
        this._id = value;
    };
    Antec.prototype.getidentifiant = function () {
        return this._identifiant;
    };
    Antec.prototype.setidentifiant = function (value) {
        this._identifiant = value;
    };
    Antec.prototype.getnumeroDossier = function () {
        return this._numeroDossier;
    };
    Antec.prototype.setnumeroDossier = function (value) {
        this._numeroDossier = value;
    };
    Antec.prototype.getobservation = function () {
        return this._observation;
    };
    Antec.prototype.setobservation = function (value) {
        this._observation = value;
    };
    Antec.prototype.getutilisateurAnt = function () {
        return this._utilisateurAnt;
    };
    Antec.prototype.setutilisateurAnt = function (value) {
        this._utilisateurAnt = value;
    };
    return Antec;
}());
exports.Antec = Antec;
