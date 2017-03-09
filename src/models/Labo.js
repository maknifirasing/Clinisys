"use strict";
/**
 * Created by makni on 17/02/2017.
 */
var Labo = (function () {
    function Labo() {
    }
    Labo.prototype.getcodeDemande = function () {
        return this._codeDemande;
    };
    Labo.prototype.setcodeDemande = function (value) {
        this._codeDemande = value;
    };
    Labo.prototype.getcontenuePDF = function () {
        return this._contenuePDF;
    };
    Labo.prototype.setcontenuePDF = function (value) {
        this._contenuePDF = value;
    };
    Labo.prototype.getdateDemande = function () {
        return this._dateDemande;
    };
    Labo.prototype.setdateDemande = function (value) {
        this._dateDemande = value;
    };
    Labo.prototype.getdateRealisation = function () {
        return this._dateRealisation;
    };
    Labo.prototype.setdateRealisation = function (value) {
        this._dateRealisation = value;
    };
    Labo.prototype.getdesignation = function () {
        return this._designation;
    };
    Labo.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    Labo.prototype.getetatExamen = function () {
        return this._etatExamen;
    };
    Labo.prototype.setetatExamen = function (value) {
        this._etatExamen = value;
    };
    Labo.prototype.getid = function () {
        return this._id;
    };
    Labo.prototype.setid = function (value) {
        this._id = value;
    };
    Labo.prototype.getmedecinTraitant = function () {
        return this._medecinTraitant;
    };
    Labo.prototype.setmedecinTraitant = function (value) {
        this._medecinTraitant = value;
    };
    Labo.prototype.getnomLabo = function () {
        return this._nomLabo;
    };
    Labo.prototype.setnomLabo = function (value) {
        this._nomLabo = value;
    };
    Labo.prototype.getnumAdmission = function () {
        return this._numAdmission;
    };
    Labo.prototype.setnumAdmission = function (value) {
        this._numAdmission = value;
    };
    Labo.prototype.getnumDossier = function () {
        return this._numDossier;
    };
    Labo.prototype.setnumDossier = function (value) {
        this._numDossier = value;
    };
    Labo.prototype.getpatient = function () {
        return this._patient;
    };
    Labo.prototype.setpatient = function (value) {
        this._patient = value;
    };
    Labo.prototype.getstate = function () {
        return this._state;
    };
    Labo.prototype.setstate = function (value) {
        this._state = value;
    };
    Labo.prototype.getuserName = function () {
        return this._userName;
    };
    Labo.prototype.setuserName = function (value) {
        this._userName = value;
    };
    Labo.prototype.getvalidation = function () {
        return this._validation;
    };
    Labo.prototype.setvalidation = function (value) {
        this._validation = value;
    };
    return Labo;
}());
exports.Labo = Labo;
