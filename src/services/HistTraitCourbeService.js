import { HistDossier } from "../models/HistDossier";
var HistTraitCourbeService = (function () {
    function HistTraitCourbeService(sqlite) {
        this.sqlite = sqlite;
        this.histSigneCourbe = [];
    }
    HistTraitCourbeService.prototype.verifHistTraitCourbe = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from HistTraitCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 HistTraitCourbe  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    HistTraitCourbeService.prototype.getHistTraitCourbes = function (histDossiers, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from HistTraitCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertHistTraitCourbes(histDossiers);
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
                    console.error('Error opening database', error);
                    alert('Error 1.1 HistTraitCourbe  ' + error);
                });
            });
            return _this;
        });
    };
    HistTraitCourbeService.prototype._insertHistTraitCourbes = function (histDossiers) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in histDossiers) {
                if (!histDossiers.hasOwnProperty(key)) {
                    continue;
                }
                var histDossier = histDossiers[key];
                db.executeSql('insert into HistTraitCourbe (numDoss ,date ,codeClinique) values (?,?,?)', [
                    histDossier.getnumDoss(),
                    histDossier.getdate(),
                    histDossier.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 HistTraitCourbe ' + error);
        });
    };
    HistTraitCourbeService.prototype.deleteHistTraitCourbes = function (numDoss, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from HistTraitCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //  alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 HistTraitCourbe  ' + error);
            });
        });
        return this.histSigneCourbe;
    };
    return HistTraitCourbeService;
}());
export { HistTraitCourbeService };
//# sourceMappingURL=HistTraitCourbeService.js.map