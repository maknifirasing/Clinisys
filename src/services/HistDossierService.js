import { SQLite } from 'ionic-native';
import { HistDossier } from "../models/HistDossier";
var HistDossierService = (function () {
    function HistDossierService() {
        this.histDossier = [];
    }
    HistDossierService.prototype.verifHistDossier = function (numDoss, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 1) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 HistDossier  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    HistDossierService.prototype.getHistDossiers = function (histDossiers, numDoss, codeClinique) {
        var _this = this;
        this.histDossier.push(histDossiers[0]);
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertHistPatients(histDossiers);
                }
                else {
                    _this.histDossier.pop();
                    _this.histDossier = [];
                    _this.histDossier.length = 0;
                    var d;
                    for (var i = 0; i < result.rows.length; i++) {
                        d = new HistDossier();
                        d.setnumDoss(result.rows.item(i).numDoss);
                        d.setdate(result.rows.item(i).date);
                        d.setcodeClinique(result.rows.item(i).codeClinique);
                        _this.histDossier.push(d);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1.1 HistDossier  ' + error);
            });
        });
        db.close();
        return this.histDossier;
    };
    HistDossierService.prototype.getHistDossiersOff = function (histDossiers, numDoss, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    return _this.histDossier;
                }
                else {
                    var d;
                    for (var i = 0; i < result.rows.length; i++) {
                        d = new HistDossier();
                        d.setnumDoss(result.rows.item(i).numDoss);
                        d.setdate(result.rows.item(i).date);
                        d.setcodeClinique(result.rows.item(i).codeClinique);
                        _this.histDossier.push(d);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1.2 HistDossier  ' + error);
            });
        });
        db.close();
        return this.histDossier;
    };
    HistDossierService.prototype._insertHistPatients = function (histDossiers) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in histDossiers) {
                if (!histDossiers.hasOwnProperty(key)) {
                    continue;
                }
                var histDossier = histDossiers[key];
                db.executeSql('insert into HistDossier (numDoss ,date ,codeClinique) values (?,?,?)', [
                    histDossier.getnumDoss(),
                    histDossier.getdate(),
                    histDossier.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 HistDossier ' + error);
        });
        db.close();
    };
    HistDossierService.prototype.deleteHistDossiers = function (numDoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //  alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 HistDossier  ' + error);
            });
        });
        db.close();
        return this.histDossier;
    };
    return HistDossierService;
}());
export { HistDossierService };
//# sourceMappingURL=HistDossierService.js.map