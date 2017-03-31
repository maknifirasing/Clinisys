"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ionic_native_1 = require("ionic-native");
var Medecin_1 = require("../models/Medecin");
var MedecinService = (function () {
    function MedecinService() {
        this.medecin = [];
    }
    MedecinService.prototype.verifMedecin = function (medecins, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new ionic_native_1.SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.item(0).sum > 0) {
                        resolve(true);
                        return true;
                    }
                    else {
                        resolve(false);
                        return false;
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 0 Medecin  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    MedecinService.prototype.getMedecins = function (medecins, numdoss, codeClinique) {
        var _this = this;
        var db = new ionic_native_1.SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertMedecins(medecins, numdoss);
                }
                else {
                    var med;
                    for (var i = 0; i < result.rows.length; i++) {
                        med = new Medecin_1.Medecin();
                        med.setcodMed(result.rows.item(i).codMed);
                        med.setnomMed(result.rows.item(i).nomMed);
                        med.setdesignationSpecialite(result.rows.item(i).designationSpecialite);
                        med.setcodeClinique(result.rows.item(i).codeClinique);
                        _this.medecin.push(med);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 medecin  ' + error);
            });
        });
        db.close();
        return this.medecin;
    };
    MedecinService.prototype._insertMedecins = function (medecins, numdoss) {
        var db = new ionic_native_1.SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in medecins) {
                if (!medecins.hasOwnProperty(key)) {
                    continue;
                }
                var medecin = medecins[key];
                db.executeSql('insert into Medecin (codMed,nomMed,designationSpecialite' +
                    ',codeClinique,numdoss) values (?,?,?,?,?)', [
                    medecin.getcodMed(),
                    medecin.getnomMed(),
                    medecin.getdesignationSpecialite(),
                    medecin.getcodeClinique(),
                    numdoss
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 medecin ' + error);
        });
        db.close();
    };
    MedecinService.prototype.deleteMedecins = function (numdoss, codeClinique) {
        var db = new ionic_native_1.SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                alert("Suppression de table medecin est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 medecin  ' + error);
            });
        });
        db.close();
        return this.medecin;
    };
    return MedecinService;
}());
exports.MedecinService = MedecinService;