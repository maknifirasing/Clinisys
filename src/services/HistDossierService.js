import { SQLite } from 'ionic-native';
import { HistDossier } from "../models/HistDossier";
var HistDossierService = (function () {
    function HistDossierService() {
    }
    HistDossierService.prototype.verifHistDossier = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 HistDossier  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    HistDossierService.prototype.getHistDossiers = function (histDossiers, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertHistPatients(histDossiers);
                        resolve(histDossiers);
                    }
                    else {
                        _this.histDossier = new HistDossier();
                        _this.histDossier.setnumDoss(result.rows.item(0).numDoss);
                        _this.histDossier.setdate(result.rows.item(0).date);
                        _this.histDossier.setcodeClinique(result.rows.item(0).codeClinique);
                        resolve(_this.histDossier);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1.1 HistDossier  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    HistDossierService.prototype._insertHistPatients = function (histDossier) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql('insert into HistDossier (numDoss ,date ,codeClinique) values (?,?,?)', [
                histDossier.getnumDoss(),
                histDossier.getdate(),
                histDossier.getcodeClinique()
            ]);
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 HistDossier ' + error);
        });
        db.close();
    };
    HistDossierService.prototype.deleteHistDossiers = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("delete from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
                    .then(function () {
                    //      alert("Suppression de table HistDossier est terminé avec succes");
                    resolve(true);
                    return true;
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 3 HistDossier  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    return HistDossierService;
}());
export { HistDossierService };
//# sourceMappingURL=HistDossierService.js.map