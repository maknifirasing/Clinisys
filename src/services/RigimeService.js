import { SQLite } from 'ionic-native';
import { Rigime } from "../models/Rigime";
var RigimeService = (function () {
    function RigimeService() {
        this.rigime = [];
    }
    RigimeService.prototype.verifRigime = function (rigimes, numdoss, datefeuille, nature, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === rigimes.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 Rigime  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    RigimeService.prototype.getRigimes = function (rigimes, numdoss, datefeuille, nature, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertRigimes(rigimes, numdoss, datefeuille, nature, codeClinique);
                }
                else {
                    var r;
                    for (var i = 0; i < result.rows.length; i++) {
                        r = new Rigime();
                        r.setcodeRegime(result.rows.item(0).codeRegime);
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
        db.close();
        return this.rigime;
    };
    RigimeService.prototype._insertRigimes = function (rigimes, numdoss, datefeuille, nature, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in rigimes) {
                if (!rigimes.hasOwnProperty(key)) {
                    continue;
                }
                var rigime = rigimes[key];
                db.executeSql('insert into Rigime (codeRegime, designation ,numdoss ' +
                    ',datefeuille, nature,codeClinique) values (?,?,?,?,?,?)', [
                    rigime.getcodeRegime(),
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
        db.close();
    };
    RigimeService.prototype.deleteRigimes = function (numdoss, datefeuille, nature, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //      alert("Suppression de table Rigime est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Rigime  ' + error);
            });
        });
        db.close();
        return this.rigime;
    };
    return RigimeService;
}());
export { RigimeService };
//# sourceMappingURL=RigimeService.js.map