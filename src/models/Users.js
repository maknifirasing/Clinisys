/**
 * Created by makni on 09/02/2017.
 */
var Users = (function () {
    function Users() {
    }
    Users.prototype.getactif = function () {
        return this._actif;
    };
    Users.prototype.setactif = function (value) {
        this._actif = value;
    };
    Users.prototype.getchStat = function () {
        return this._chStat;
    };
    Users.prototype.setchStat = function (value) {
        this._chStat = value;
    };
    Users.prototype.getcodeMedecinInfirmier = function () {
        return this._codeMedecinInfirmier;
    };
    Users.prototype.setcodeMedecinInfirmier = function (value) {
        this._codeMedecinInfirmier = value;
    };
    Users.prototype.getcodePin = function () {
        return this._codePin;
    };
    Users.prototype.setcodePin = function (value) {
        this._codePin = value;
    };
    Users.prototype.getdateModPwd = function () {
        return this._dateModPwd;
    };
    Users.prototype.setdateModPwd = function (value) {
        this._dateModPwd = value;
    };
    Users.prototype.getdernierDateCnx = function () {
        return this._dernierDateCnx;
    };
    Users.prototype.setdernierDateCnx = function (value) {
        this._dernierDateCnx = value;
    };
    Users.prototype.getdescription = function () {
        return this._description;
    };
    Users.prototype.setdescription = function (value) {
        this._description = value;
    };
    Users.prototype.getgrp = function () {
        return this._grp;
    };
    Users.prototype.setgrp = function (value) {
        this._grp = value;
    };
    Users.prototype.getmatricule = function () {
        return this._matricule;
    };
    Users.prototype.setmatricule = function (value) {
        this._matricule = value;
    };
    Users.prototype.getnatureUserDS = function () {
        return this._natureUserDS;
    };
    Users.prototype.setnatureUserDS = function (value) {
        this._natureUserDS = value;
    };
    Users.prototype.getoldGrp = function () {
        return this._oldGrp;
    };
    Users.prototype.setoldGrp = function (value) {
        this._oldGrp = value;
    };
    Users.prototype.getpassWord = function () {
        return this._passWord;
    };
    Users.prototype.setpassWord = function (value) {
        this._passWord = value;
    };
    Users.prototype.getuserName = function () {
        return this._userName;
    };
    Users.prototype.setuserName = function (value) {
        this._userName = value;
    };
    Users.prototype.getvalidCptRend = function () {
        return this._validCptRend;
    };
    Users.prototype.setvalidCptRend = function (value) {
        this._validCptRend = value;
    };
    Users.prototype.getvalidPHNuit = function () {
        return this._validPHNuit;
    };
    Users.prototype.setvalidPHNuit = function (value) {
        this._validPHNuit = value;
    };
    return Users;
}());
export { Users };
//# sourceMappingURL=Users.js.map