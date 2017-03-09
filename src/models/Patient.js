"use strict";
var Patient = (function () {
    function Patient() {
    }
    Patient.prototype.getnature = function () {
        return this._nature;
    };
    Patient.prototype.setnature = function (value) {
        this._nature = value;
    };
    Patient.prototype.getid = function () {
        return this._id;
    };
    Patient.prototype.setid = function (value) {
        this._id = value;
    };
    Patient.prototype.getdossier = function () {
        return this._dossier;
    };
    Patient.prototype.setdossier = function (value) {
        this._dossier = value;
    };
    Patient.prototype.getchambre = function () {
        return this._chambre;
    };
    Patient.prototype.setchambre = function (value) {
        this._chambre = value;
    };
    Patient.prototype.getnom = function () {
        return this._nom;
    };
    Patient.prototype.setnom = function (value) {
        this._nom = value;
    };
    Patient.prototype.getprenom = function () {
        return this._prenom;
    };
    Patient.prototype.setprenom = function (value) {
        this._prenom = value;
    };
    Patient.prototype.getdateNaiss = function () {
        return this._dateNaiss;
    };
    Patient.prototype.setdateNaiss = function (value) {
        this._dateNaiss = value;
    };
    Patient.prototype.getmedecin = function () {
        return this._medecin;
    };
    Patient.prototype.setmedecin = function (value) {
        this._medecin = value;
    };
    Patient.prototype.getspec = function () {
        return this._spec;
    };
    Patient.prototype.setspec = function (value) {
        this._spec = value;
    };
    Patient.prototype.getetat = function () {
        return this._etat;
    };
    Patient.prototype.setetat = function (value) {
        this._etat = value;
    };
    Patient.prototype.getage = function () {
        return this._age;
    };
    Patient.prototype.setage = function (value) {
        this._age = value;
    };
    Patient.prototype.getimg = function () {
        return this._img;
    };
    Patient.prototype.setimg = function (value) {
        this._img = value;
    };
    return Patient;
}());
exports.Patient = Patient;
