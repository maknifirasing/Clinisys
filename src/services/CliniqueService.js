import { Clinique } from "../models/Clinique";
var CliniqueService = (function () {
    function CliniqueService(sqlite) {
        this.sqlite = sqlite;
        this.clinique = [];
    }
    CliniqueService.prototype.verifClinique = function (cliniques) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from Clinique ", [])
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
                     //alert('Error 0 Clinique  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    CliniqueService.prototype.getCliniques = function (cliniques) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from Clinique ", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertCliniques(cliniques);
                    }
                    else {
                        var c;
                        for (var i = 0; i < result.rows.length; i++) {
                            c = new Clinique();
                            c.setcode(result.rows.item(i).code);
                            c.setnom(result.rows.item(i).nom);
                            c.seturl(result.rows.item(i).url);
                            _this.clinique.push(c);
                        }
                        resolve(_this.clinique);
                    }
                })
                    .catch(function (error) {
                    //console.error('Error opening database', error);
                     //alert('Error 1 Clinique  ' + error);
                });
            });
            return _this;
        });
    };
    CliniqueService.prototype._insertCliniques = function (cliniques) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in cliniques) {
                if (!cliniques.hasOwnProperty(key)) {
                    continue;
                }
                var clinique = cliniques[key];
                db.executeSql('insert into Clinique (code,nom,url) values (?,?,?)', [
                    clinique.getcode(),
                    clinique.getnom(),
                    clinique.geturl()
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 Clinique ' + error);
        });
    };
    CliniqueService.prototype.deleteCliniques = function () {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from Clinique ", [])
                .then(function () {
                //     //alert("Suppression de table Aleg est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 Clinique  ' + error);
            });
        });
        return this.clinique;
    };
    return CliniqueService;
}());
export { CliniqueService };
//# sourceMappingURL=CliniqueService.js.map
