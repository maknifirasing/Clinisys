"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SigneCourbe = (function () {
    function SigneCourbe() {
    }
    SigneCourbe.prototype.getcodePosologie = function () {
        return this._codePosologie;
    };
    SigneCourbe.prototype.setcodePosologie = function (value) {
        this._codePosologie = value;
    };
    SigneCourbe.prototype.getdesignation = function () {
        return this._designation;
    };
    SigneCourbe.prototype.setdesignation = function (value) {
        this._designation = value;
    };
    SigneCourbe.prototype.getseuilMin = function () {
        return this._seuilMin;
    };
    SigneCourbe.prototype.setseuilMin = function (value) {
        this._seuilMin = value;
    };
    SigneCourbe.prototype.getseuilMax = function () {
        return this._seuilMax;
    };
    SigneCourbe.prototype.setseuilMax = function (value) {
        this._seuilMax = value;
    };
    SigneCourbe.prototype.getcolor = function () {
        return this._color;
    };
    SigneCourbe.prototype.setcolor = function (value) {
        this._color = value;
    };
    SigneCourbe.prototype.getunite = function () {
        return this._unite;
    };
    SigneCourbe.prototype.setunite = function (value) {
        this._unite = value;
    };
    SigneCourbe.prototype.getquantite = function () {
        return this._quantite;
    };
    SigneCourbe.prototype.setquantite = function (value) {
        this._quantite = value;
    };
    SigneCourbe.prototype.getheurePrise = function () {
        return this._heurePrise;
    };
    SigneCourbe.prototype.setheurePrise = function (value) {
        this._heurePrise = value;
    };
    SigneCourbe.prototype.getdateHeurePrise = function () {
        return this._dateHeurePrise;
    };
    SigneCourbe.prototype.setdateHeurePrise = function (value) {
        this._dateHeurePrise = value;
    };
    return SigneCourbe;
}());
exports.SigneCourbe = SigneCourbe;
