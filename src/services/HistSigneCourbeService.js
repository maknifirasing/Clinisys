import { HistDossier } from "../models/HistDossier";
var HistSigneCourbeService = (function () {
    function HistSigneCourbeService(sqlite) {
        this.sqlite = sqlite;
        this.histSigneCourbe = [];
    }
    HistSigneCourbeService.prototype.verifHistSigneCourbe = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from HistSigneCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
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
                    //console.error('Error opening database', error);
                     //alert('Error 0 HistSigneCourbe  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    HistSigneCourbeService.prototype.getHistSigneCourbes = function (histDossiers, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from HistSigneCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertHistSigneCourbes(histDossiers);
                        resolve(histDossiers[0]);
                    }
                    else {
                        _this.histSigneCourbe.pop();
                        _this.histSigneCourbe = [];
                        _this.histSigneCourbe.length = 0;
                        var d;
                        for (var i = 0; i < result.rows.length; i++) {
                            d = new HistDossier();
                            d.setnumDoss(result.rows.item(i).numDoss);
                            d.setdate(result.rows.item(i).date);
                            d.setcodeClinique(result.rows.item(i).codeClinique);
                            _this.histSigneCourbe.push(d);
                        }
                        resolve(_this.histSigneCourbe[0]);
                    }
                })
                    .catch(function (error) {
                    //console.error('Error opening database', error);
                     //alert('Error 1.1 HistSigneCourbe  ' + error);
                });
            });
            return _this;
        });
    };
    HistSigneCourbeService.prototype._insertHistSigneCourbes = function (histDossiers) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in histDossiers) {
                if (!histDossiers.hasOwnProperty(key)) {
                    continue;
                }
                var histDossier = histDossiers[key];
                db.executeSql('insert into HistSigneCourbe (numDoss ,date ,codeClinique) values (?,?,?)', [
                    histDossier.getnumDoss(),
                    histDossier.getdate(),
                    histDossier.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 HistSigneCourbe ' + error);
        });
    };
    HistSigneCourbeService.prototype.deleteHistSigneCourbes = function (numDoss, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   //alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 HistDossier  ' + error);
            });
        });
        return this.histSigneCourbe;
    };
    return HistSigneCourbeService;
}());
export { HistSigneCourbeService };
//# sourceMappingURL=HistSigneCourbeService.js.map
