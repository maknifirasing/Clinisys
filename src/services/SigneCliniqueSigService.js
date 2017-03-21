import { SQLite } from 'ionic-native';
import { SigneClinique } from "../models/SigneClinique";
var SigneCliniqueSigService = (function () {
    function SigneCliniqueSigService() {
        this.signeClinique = [];
    }
    SigneCliniqueSigService.prototype.verifSigneClinique = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from SigneCliniqueSig where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
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
                    alert('Error 0 SigneCliniqueSig  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    SigneCliniqueSigService.prototype.getSigneCliniques = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from SigneCliniqueSig where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
                + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertSigneCliniques(signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique);
                }
                else {
                    var s;
                    for (var i = 0; i < result.rows.length; i++) {
                        s = new SigneClinique();
                        s.setcodeType(result.rows.item(i).codeType);
                        s.setdate(result.rows.item(i).date);
                        s.setdesignation(result.rows.item(i).designation);
                        s.setquantite(result.rows.item(i).quantite);
                        _this.signeClinique.push(s);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 SigneCliniqueSig  ' + error);
            });
        });
        db.close();
        return this.signeClinique;
    };
    SigneCliniqueSigService.prototype._insertSigneCliniques = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
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
                db.executeSql('insert into SigneCliniqueSig (codeType ,date ,designation ,quantite ,numDoss ,dateFeuille, nature ,codetypeof,codeClinique) values (?,?,?,?,?,?,?,?,?)', [
                    s.getcodeType(),
                    s.getdate(),
                    s.getdesignation(),
                    s.getquantite(),
                    numDoss,
                    dateFeuille,
                    nature,
                    codeType,
                    codeClinique,
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 SigneCliniqueSig ' + error);
        });
        db.close();
    };
    SigneCliniqueSigService.prototype.deleteSigneCliniques = function (numDoss, dateFeuille, nature, codeType, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from SigneCliniqueSig where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //      alert("Suppression de table SigneCliniqueSig est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 SigneCliniqueSig  ' + error);
            });
        });
        db.close();
        return this.signeClinique;
    };
    return SigneCliniqueSigService;
}());
export { SigneCliniqueSigService };
//# sourceMappingURL=SigneCliniqueSigService.js.map