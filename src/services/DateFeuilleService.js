import { DateFeuille } from "../models/DateFeuille";
var DateFeuilleService = (function () {
    function DateFeuilleService(sqlite) {
        this.sqlite = sqlite;
        this.date = [];
    }
    DateFeuilleService.prototype.verifDateFeuille = function (codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from DateFeuille where codeClinique like '" + codeClinique + "'", []).then(function (result) {
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
                     //alert('Error 0 datefeuille  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    DateFeuilleService.prototype.getDateFeuille = function (dates, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from DateFeuille where codeClinique like '" + codeClinique + "'", []).then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertDateFeuille(dates, codeClinique);
                }
                else {
                    var d;
                    for (var i = 0; i < result.rows.length; i++) {
                        d = new DateFeuille();
                        d.setdatefeuille(result.rows.item(i).datefeuille);
                        _this.date.push(d);
                    }
                }
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 1 datefeuille  ' + error);
            });
        });
        return this.date;
    };
    DateFeuilleService.prototype._insertDateFeuille = function (dates, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in dates) {
                if (!dates.hasOwnProperty(key)) {
                    continue;
                }
                var date = dates[key];
                db.executeSql('insert into DateFeuille (datefeuille ,codeClinique) values (?,?)', [
                    date.getdatefeuille(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 datefeuille ' + error);
        });
    };
    DateFeuilleService.prototype.deleteDateFeuille = function (codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from DateFeuille where codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //     //alert("Suppression de table DateFeuille est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 DateFeuille  ' + error);
            });
        });
        return this.date;
    };
    return DateFeuilleService;
}());
export { DateFeuilleService };
//# sourceMappingURL=DateFeuilleService.js.map
