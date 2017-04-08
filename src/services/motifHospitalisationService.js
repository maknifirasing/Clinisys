import { SQLite } from 'ionic-native';
import { MotifHospitalisation } from "../models/motifHospitalisation";
var motifHospitalisationService = (function () {
    function motifHospitalisationService() {
        this.motifhospitalisation = [];
    }
    motifHospitalisationService.prototype.verifmotifHospitalisation = function (motifhospitalisations, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 motifHospitalisation  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    motifHospitalisationService.prototype.getmotifHospitalisations = function (motifhospitalisations, numdoss, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertmotifHospitalisations(motifhospitalisations, codeClinique);
                }
                else {
                    var m;
                    for (var i = 0; i < result.rows.length; i++) {
                        m = new MotifHospitalisation();
                        m.setgroupeSang(result.rows.item(0).groupeSang);
                        m.setmotifhospitalisation(result.rows.item(0).motifhospitalisation);
                        m.setnumdoss(result.rows.item(0).numdoss);
                        m.setpoid(result.rows.item(0).poid);
                        m.settaille(result.rows.item(0).taille);
                        _this.motifhospitalisation.push(m);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 motifHospitalisation  ' + error);
            });
        });
        db.close();
        return this.motifhospitalisation;
    };
    motifHospitalisationService.prototype._insertmotifHospitalisations = function (motifhospitalisations, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in motifhospitalisations) {
                if (!motifhospitalisations.hasOwnProperty(key)) {
                    continue;
                }
                var motifhospitalisation = motifhospitalisations[key];
                db.executeSql('insert into motifHospitalisation (groupeSang ,motifhospitalisation ,numdoss ,poid ,taille ,codeClinique)' +
                    ' values (?,?,?,?,?,?)', [
                    motifhospitalisation.getgroupeSang(),
                    motifhospitalisation.getmotifhospitalisation(),
                    motifhospitalisation.getnumdoss(),
                    motifhospitalisation.getpoid(),
                    motifhospitalisation.gettaille(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 motifHospitalisation ' + error);
        });
        db.close();
    };
    motifHospitalisationService.prototype.deleteMotifhospitalisations = function (numdoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Motifhospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //      alert("Suppression de table Motifhospitalisation est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Motifhospitalisation  ' + error);
            });
        });
        db.close();
        return this.motifhospitalisation;
    };
    return motifHospitalisationService;
}());
export { motifHospitalisationService };
//# sourceMappingURL=motifHospitalisationService.js.map