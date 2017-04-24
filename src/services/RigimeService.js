import { Rigime } from "../models/Rigime";
var RigimeService = (function () {
    function RigimeService(sqlite) {
        this.sqlite = sqlite;
        this.rigime = [];
    }
    RigimeService.prototype.verifRigime = function (rigimes, numdoss, datefeuille, nature, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 Rigime  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    RigimeService.prototype.getRigimes = function (rigimes, numdoss, datefeuille, nature, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertRigimes(rigimes, numdoss, datefeuille, nature, codeClinique);
                }
                else {
                    var r;
                    for (var i = 0; i < result.rows.length; i++) {
                        r = new Rigime();
                        r.setdesignation(result.rows.item(0).designation);
                        _this.rigime.push(r);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Rigime  ' + error);
            });
        });
        return this.rigime;
    };
    RigimeService.prototype._insertRigimes = function (rigimes, numdoss, datefeuille, nature, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in rigimes) {
                if (!rigimes.hasOwnProperty(key)) {
                    continue;
                }
                var rigime = rigimes[key];
                db.executeSql('insert into Rigime (designation ,numdoss ' +
                    ',datefeuille, nature,codeClinique) values (?,?,?,?,?)', [
                    rigime.getdesignation(),
                    numdoss,
                    datefeuille,
                    nature,
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Rigime ' + error);
        });
    };
    RigimeService.prototype.deleteRigimes = function (numdoss, datefeuille, nature, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //      alert("Suppression de table Rigime est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Rigime  ' + error);
            });
        });
        return this.rigime;
    };
    return RigimeService;
}());
export { RigimeService };
//# sourceMappingURL=RigimeService.js.map