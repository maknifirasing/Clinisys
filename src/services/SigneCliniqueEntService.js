import { SQLite } from 'ionic-native';
import { SigneClinique } from "../models/SigneClinique";
var SigneCliniqueEntService = (function () {
    function SigneCliniqueEntService() {
        this.signeClinique = [];
    }
    SigneCliniqueEntService.prototype.verifSigneClinique = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from SigneCliniqueEnt where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
                    + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 SigneCliniqueEnt  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    SigneCliniqueEntService.prototype.getSigneCliniques = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from SigneCliniqueEnt where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
                + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertSigneCliniques(signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique);
                }
                else {
                    var s;
                    for (var i = 0; i < result.rows.length; i++) {
                        s = new SigneClinique();
                        s.setdate(result.rows.item(i).date);
                        s.setdesignation(result.rows.item(i).designation);
                        s.setquantite(result.rows.item(i).quantite);
                        _this.signeClinique.push(s);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 SigneCliniqueEnt  ' + error);
            });
        });
        db.close();
        return this.signeClinique;
    };
    SigneCliniqueEntService.prototype._insertSigneCliniques = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in signeCliniques) {
                if (!signeCliniques.hasOwnProperty(key)) {
                    continue;
                }
                var s = signeCliniques[key];
                db.executeSql('insert into SigneCliniqueEnt (date ,designation ,quantite ,numDoss ,dateFeuille, nature ,codetypeof,codeClinique) values (?,?,?,?,?,?,?,?)', [
                    s.getdate(),
                    s.getdesignation(),
                    s.getquantite(),
                    numDoss,
                    dateFeuille,
                    nature,
                    codeType,
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 SigneCliniqueEnt ' + error);
        });
        db.close();
    };
    SigneCliniqueEntService.prototype.deleteSigneCliniques = function (numDoss, dateFeuille, nature, codeType, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from SigneCliniqueEnt where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //      alert("Suppression de table SigneCliniqueEnt est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 SigneCliniqueEnt  ' + error);
            });
        });
        db.close();
        return this.signeClinique;
    };
    return SigneCliniqueEntService;
}());
export { SigneCliniqueEntService };
//# sourceMappingURL=SigneCliniqueEntService.js.map