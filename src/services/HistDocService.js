import { SQLite } from 'ionic-native';
import { HistDoc } from "../models/HistDoc";
var HistDocService = (function () {
    function HistDocService() {
        this.histSigneCourbe = [];
    }
    HistDocService.prototype.verifHistDoc = function (numDoss, codeClinique, file) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
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
                    alert('Error 0 HistDoc  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    HistDocService.prototype.getHistDocs = function (histDossiers, numDoss, codeClinique, file) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertHistDocs(histDossiers);
                        resolve(histDossiers[0]);
                    }
                    else {
                        _this.histSigneCourbe.pop();
                        _this.histSigneCourbe = [];
                        _this.histSigneCourbe.length = 0;
                        var d;
                        for (var i = 0; i < result.rows.length; i++) {
                            d = new HistDoc();
                            d.setnumDoss(result.rows.item(i).numDoss);
                            d.setdate(result.rows.item(i).date);
                            d.setcodeClinique(result.rows.item(i).codeClinique);
                            d.setnom(result.rows.item(i).nom);
                            _this.histSigneCourbe.push(d);
                        }
                        resolve(_this.histSigneCourbe[0]);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1.1 HistDoc  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    HistDocService.prototype._insertHistDocs = function (histDossiers) {
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
                db.executeSql('insert into HistDoc (numDoss ,date ,codeClinique,nom) values (?,?,?,?)', [
                    histDossier.getnumDoss(),
                    histDossier.getdate(),
                    histDossier.getcodeClinique(),
                    histDossier.getnom()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 HistDoc ' + error);
        });
        db.close();
    };
    HistDocService.prototype.deleteHistDocs = function (numDoss, codeClinique, file) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
                .then(function () {
                //  alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 HistDoc  ' + error);
            });
        });
        db.close();
        return this.histSigneCourbe;
    };
    return HistDocService;
}());
export { HistDocService };
//# sourceMappingURL=HistDocService.js.map