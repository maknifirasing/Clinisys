"use strict";
/**
 * Created by makni on 15/02/2017.
 */
var Traitement = (function () {
    function Traitement() {
    }
    Traitement.prototype.getcodePosologie = function () {
        return this._codePosologie;
    };
    Traitement.prototype.setcodePosologie = function (value) {
        this._codePosologie = value;
    };
    Traitement.prototype.getdate = function () {
        return this._date;
    };
    Traitement.prototype.setdate = function (value) {
        this._date = value;
    };
    Traitement.prototype.getdateFinTrait = function () {
        return this._dateFinTrait;
    };
    Traitement.prototype.setdateFinTrait = function (value) {
        this._dateFinTrait = value;
    };
    Traitement.prototype.getdci = function () {
        return this._dci;
    };
    Traitement.prototype.setdci = function (value) {
        this._dci = value;
    };
    Traitement.prototype.getdesignation = function () {
        return this._designation;
    };
    Traitement.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    Traitement.prototype.getdureEnJour = function () {
        return this._dureEnJour;
    };
    Traitement.prototype.setdureEnJour = function (value) {
        this._dureEnJour = value;
    };
    Traitement.prototype.getheure = function () {
        return this._heure;
    };
    Traitement.prototype.setheure = function (value) {
        this._heure = value;
    };
    Traitement.prototype.getheureDebut = function () {
        return this._heureDebut;
    };
    Traitement.prototype.setheureDebut = function (value) {
        this._heureDebut = value;
    };
    Traitement.prototype.getjour = function () {
        return this._jour;
    };
    Traitement.prototype.setjour = function (value) {
        this._jour = value;
    };
    Traitement.prototype.getnbFois = function () {
        return this._nbFois;
    };
    Traitement.prototype.setnbFois = function (value) {
        this._nbFois = value;
    };
    Traitement.prototype.getnumDoss = function () {
        return this._numDoss;
    };
    Traitement.prototype.setnumDoss = function (value) {
        this._numDoss = value;
    };
    Traitement.prototype.getnumTraitement = function () {
        return this._numTraitement;
    };
    Traitement.prototype.setnumTraitement = function (value) {
        this._numTraitement = value;
    };
    Traitement.prototype.getnumbon = function () {
        return this._numbon;
    };
    Traitement.prototype.setnumbon = function (value) {
        this._numbon = value;
    };
    Traitement.prototype.getposologie = function () {
        return this._posologie;
    };
    Traitement.prototype.setposologie = function (value) {
        this._posologie = value;
    };
    Traitement.prototype.getprescripteur = function () {
        return this._prescripteur;
    };
    Traitement.prototype.setprescripteur = function (value) {
        this._prescripteur = value;
    };
    Traitement.prototype.getquantite = function () {
        return this._quantite;
    };
    Traitement.prototype.setquantite = function (value) {
        this._quantite = value;
    };
    Traitement.prototype.getunite = function () {
        return this._unite;
    };
    Traitement.prototype.setunite = function (value) {
        this._unite = value;
    };
    Traitement.prototype.getvitesse = function () {
        return this._vitesse;
    };
    Traitement.prototype.setvitesse = function (value) {
        this._vitesse = value;
    };
    Traitement.prototype.getvoie = function () {
        return this._voie;
    };
    Traitement.prototype.setvoie = function (value) {
        this._voie = value;
    };
    Traitement.prototype.getvolume = function () {
        return this._volume;
    };
    Traitement.prototype.setvolume = function (value) {
        this._volume = value;
    };
    return Traitement;
}());
exports.Traitement = Traitement;
