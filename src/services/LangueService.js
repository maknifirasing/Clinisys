import { Langue } from "../models/Langue";
var LangueService = (function () {
    function LangueService(sqlite) {
        this.sqlite = sqlite;
        this.langue = [];
    }
    LangueService.prototype.verifLangue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from Langue ", [])
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
                     //alert('Error 0 Langue  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    LangueService.prototype.getLangues = function (langues) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from Langue ", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertLangues(langues);
                        resolve(langues[0]);
                    }
                    else {
                        var l;
                        for (var i = 0; i < result.rows.length; i++) {
                            l = new Langue();
                            l.setlangue(result.rows.item(i).langue);
                            l.setnom(result.rows.item(i).nom);
                            l.setmatricule(result.rows.item(i).matricule);
                            l.setcodeClinique(result.rows.item(i).codeClinique);
                            l.setnomClinique(result.rows.item(i).nomClinique);
                            _this.langue.push(l);
                        }
                        resolve(_this.langue[0]);
                    }
                })
                    .catch(function (error) {
                    //console.error('Error opening database', error);
                     //alert('Error 1 Langue  ' + error);
                });
            });
            return _this;
        });
    };
    LangueService.prototype._insertLangues = function (langues) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in langues) {
                if (!langues.hasOwnProperty(key)) {
                    continue;
                }
                var langue = langues[key];
                db.executeSql('insert into Langue (langue,nom,matricule,codeClinique,nomClinique) values (?,?,?,?,?)', [
                    langue.getlangue(),
                    langue.getnom(),
                    langue.getmatricule(),
                    langue.getcodeClinique(),
                    langue.getnomClinique()
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 Langue ' + error);
        });
    };
    LangueService.prototype.deleteLangues = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("delete from Langue ", [])
                    .then(function () {
                    //    //alert("Suppression de table Aleg est terminé avec succes");
                    resolve(true);
                    return true;
                })
                    .catch(function (error) {
                    //console.error('Error opening database', error);
                     //alert('Error 3 Langue  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    return LangueService;
}());
export { LangueService };
//# sourceMappingURL=LangueService.js.map
