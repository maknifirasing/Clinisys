"use strict";
var Document = (function () {
    function Document() {
    }
    Document.prototype.getaccessUsersGrp = function () {
        return this._accessUsersGrp;
    };
    Document.prototype.setaccessUsersGrp = function (value) {
        this._accessUsersGrp = value;
    };
    Document.prototype.getarborescenceID = function () {
        return this._arborescenceID;
    };
    Document.prototype.setarborescenceID = function (value) {
        this._arborescenceID = value;
    };
    Document.prototype.getIDArborPere = function () {
        return this._IDArborPere;
    };
    Document.prototype.setIDArborPere = function (value) {
        this._IDArborPere = value;
    };
    Document.prototype.getnomarborescence = function () {
        return this._nomarborescence;
    };
    Document.prototype.setnomarborescence = function (value) {
        this._nomarborescence = value;
    };
    Document.prototype.getdatedoc = function () {
        return this._datedoc;
    };
    Document.prototype.setdatedoc = function (value) {
        this._datedoc = value;
    };
    Document.prototype.getdescription = function () {
        return this._description;
    };
    Document.prototype.setdescription = function (value) {
        this._description = value;
    };
    Document.prototype.getdoc = function () {
        return this._doc;
    };
    Document.prototype.setdoc = function (value) {
        this._doc = value;
    };
    Document.prototype.getdocID = function () {
        return this._docID;
    };
    Document.prototype.setdocID = function (value) {
        this._docID = value;
    };
    Document.prototype.getextension = function () {
        return this._extension;
    };
    Document.prototype.setextension = function (value) {
        this._extension = value;
    };
    Document.prototype.getnomdoc = function () {
        return this._nomdoc;
    };
    Document.prototype.setnomdoc = function (value) {
        this._nomdoc = value;
    };
    Document.prototype.getusers = function () {
        return this._users;
    };
    Document.prototype.setusers = function (value) {
        this._users = value;
    };
    return Document;
}());
exports.Document = Document;
