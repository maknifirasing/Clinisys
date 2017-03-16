import { SQLite } from 'ionic-native';
import { Clinique } from "../models/Clinique";
var CliniqueService = (function () {
    function CliniqueService() {
        this.clinique = [];
    }
    CliniqueService.prototype.verifClinique = function (cliniques) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Clinique ", [])
                .then(function (result) {
                if (result.rows.length === cliniques.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 Clinique  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    CliniqueService.prototype.getCliniques = function (cliniques) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
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
                        c.setid(result.rows.item(i).id);
                        c.setnom(result.rows.item(i).nom);
                        c.seturl(result.rows.item(i).url);
                        _this.clinique.push(c);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Clinique  ' + error);
            });
        });
        db.close();
        return this.clinique;
    };
    CliniqueService.prototype._insertCliniques = function (cliniques) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in cliniques) {
                if (!cliniques.hasOwnProperty(key)) {
                    continue;
                }
                var clinique = cliniques[key];
                db.executeSql('insert into Clinique (code ,id ,nom ,url) values (?,?,?,?)', [
                    clinique.getcode(),
                    clinique.getid(),
                    clinique.getnom(),
                    clinique.geturl()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Clinique ' + error);
        });
        db.close();
    };
    CliniqueService.prototype.deleteCliniques = function () {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Clinique ", [])
                .then(function () {
                //    alert("Suppression de table Aleg est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Clinique  ' + error);
            });
        });
        db.close();
        return this.clinique;
    };
    return CliniqueService;
}());
export { CliniqueService };
//# sourceMappingURL=CliniqueService.js.map