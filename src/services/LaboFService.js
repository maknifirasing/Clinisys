import { SQLite } from 'ionic-native';
import { Labo } from "../models/Labo";
var LaboFService = (function () {
    function LaboFService() {
        this.labo = [];
    }
    LaboFService.prototype.verifLabo = function (labos, numDossier, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from LaboF where numDossier like '" + numDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 LaboF  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    LaboFService.prototype.getLabos = function (labos, numDossier, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from LaboF where numDossier like '" + numDossier + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertLabos(labos, codeClinique);
                }
                else {
                    var l;
                    for (var i = 0; i < result.rows.length; i++) {
                        l = new Labo();
                        l.setcodeDemande(result.rows.item(i).codeDemande);
                        l.setcontenuePDF(result.rows.item(i).contenuePDF);
                        l.setdateDemande(result.rows.item(i).dateDemande);
                        l.setmedecinTraitant(result.rows.item(i).medecinTraitant);
                        l.setnumAdmission(result.rows.item(i).numAdmission);
                        l.setnumDossier(result.rows.item(i).numDossier);
                        l.setpdf(result.rows.item(i).pdf);
                        _this.labo.push(l);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 LaboF  ' + error);
            });
        });
        db.close();
        return this.labo;
    };
    LaboFService.prototype._insertLabos = function (labos, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in labos) {
                if (!labos.hasOwnProperty(key)) {
                    continue;
                }
                var labo = labos[key];
                db.executeSql('insert into LaboF (codeDemande,contenuePDF ,dateDemande ' +
                    ',medecinTraitant,numAdmission,numDossier,pdf,codeClinique) values (?,?,?,?,?,?,?,?)', [
                    labo.getcodeDemande(),
                    labo.getcontenuePDF(),
                    labo.getdateDemande(),
                    labo.getmedecinTraitant(),
                    labo.getnumAdmission(),
                    labo.getnumDossier(),
                    labo.getpdf(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 LaboF ' + error);
        });
        db.close();
    };
    LaboFService.prototype.deleteLabos = function (numDossier, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from LaboF where numDossier like '" + numDossier + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //       alert("Suppression de table Labo est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 LaboF  ' + error);
            });
        });
        db.close();
        return this.labo;
    };
    return LaboFService;
}());
export { LaboFService };
//# sourceMappingURL=LaboFService.js.map