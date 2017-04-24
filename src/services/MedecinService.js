import { Medecin } from "../models/Medecin";
var MedecinService = (function () {
    function MedecinService(sqlite) {
        this.sqlite = sqlite;
        this.medecin = [];
    }
    MedecinService.prototype.verifMedecin = function (medecins, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
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
            return _this;
        });
    };
    MedecinService.prototype.getMedecins = function (medecins, numdoss, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertMedecins(medecins, numdoss);
                }
                else {
                    var med;
                    for (var i = 0; i < result.rows.length; i++) {
                        med = new Medecin();
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
        return this.medecin;
    };
    MedecinService.prototype._insertMedecins = function (medecins, numdoss) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
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
    };
    MedecinService.prototype.deleteMedecins = function (numdoss, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                alert("Suppression de table medecin est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 medecin  ' + error);
            });
        });
        return this.medecin;
    };
    return MedecinService;
}());
export { MedecinService };
//# sourceMappingURL=MedecinService.js.map