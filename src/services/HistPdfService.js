import { HistDoc } from "../models/HistDoc";
var HistPdfService = (function () {
    function HistPdfService(sqlite) {
        this.sqlite = sqlite;
        this.histSigneCourbe = [];
    }
    HistPdfService.prototype.verifHistPdf = function (numDoss, codeClinique, file) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from HistPdf where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
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
                    alert('Error 0 HistPdf  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    HistPdfService.prototype.getHistPdfs = function (histDossiers, numDoss, codeClinique, file) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from HistPdf where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertHistPdfs(histDossiers);
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
                    alert('Error 1.1 HistPdf  ' + error);
                });
            });
            return _this;
        });
    };
    HistPdfService.prototype._insertHistPdfs = function (histDossiers) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in histDossiers) {
                if (!histDossiers.hasOwnProperty(key)) {
                    continue;
                }
                var histDossier = histDossiers[key];
                db.executeSql('insert into HistPdf (numDoss ,date ,codeClinique,nom) values (?,?,?,?)', [
                    histDossier.getnumDoss(),
                    histDossier.getdate(),
                    histDossier.getcodeClinique(),
                    histDossier.getnom()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 HistPdf ' + error);
        });
    };
    HistPdfService.prototype.deleteHistPdfs = function (numDoss, codeClinique, file) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from HistPdf where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
                .then(function () {
                //  alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 HistPdf  ' + error);
            });
        });
        return this.histSigneCourbe;
    };
    return HistPdfService;
}());
export { HistPdfService };
//# sourceMappingURL=HistPdfService.js.map