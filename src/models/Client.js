"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = (function () {
    function Client() {
    }
    Client.prototype.getadrCli = function () {
        return this._adrCli;
    };
    Client.prototype.setadrCli = function (value) {
        this._adrCli = value;
    };
    Client.prototype.getdatNai = function () {
        return this._datNai;
    };
    Client.prototype.setdatNai = function (value) {
        this._datNai = value;
    };
    Client.prototype.getlibNat = function () {
        return this._libNat;
    };
    Client.prototype.setlibNat = function (value) {
        this._libNat = value;
    };
    Client.prototype.getnumTel = function () {
        return this._numTel;
    };
    Client.prototype.setnumTel = function (value) {
        this._numTel = value;
    };
    Client.prototype.getetage = function () {
        return this._etage;
    };
    Client.prototype.setetage = function (value) {
        this._etage = value;
    };
    Client.prototype.getnumCha = function () {
        return this._numCha;
    };
    Client.prototype.setnumCha = function (value) {
        this._numCha = value;
    };
    Client.prototype.getnumdoss = function () {
        return this._numdoss;
    };
    Client.prototype.setnumdoss = function (value) {
        this._numdoss = value;
    };
    Client.prototype.getidentifiant = function () {
        return this._identifiant;
    };
    Client.prototype.setidentifiant = function (value) {
        this._identifiant = value;
    };
    Client.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    Client.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return Client;
}());
exports.Client = Client;
