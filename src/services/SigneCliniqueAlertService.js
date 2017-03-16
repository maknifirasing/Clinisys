import { SQLite } from 'ionic-native';
import { SigneClinique } from "../models/SigneClinique";
var SigneCliniqueAlertService = (function () {
    function SigneCliniqueAlertService() {
        this.signeClinique = [];
    }
    SigneCliniqueAlertService.prototype.verifSigneCliniqueAlert = function (signeCliniques, numDoss, dateFeuille, nature, codeClinique) {
        var verif;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from SigneCliniqueAlert where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
                + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                verif = (result.rows.length === signeCliniques.length);
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 SigneCliniqueAlert  ' + error);
            });
        });
        db.close();
        return verif;
    };
    SigneCliniqueAlertService.prototype.getSigneCliniquesAlert = function (signeCliniques, numDoss, dateFeuille, nature, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from SigneCliniqueAlert where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
                + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertSigneCliniquesAlert(signeCliniques, numDoss, dateFeuille, nature, codeClinique);
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
                alert('Error 1 SigneCliniqueAlert  ' + error);
            });
        });
        db.close();
        return this.signeClinique;
    };
    SigneCliniqueAlertService.prototype._insertSigneCliniquesAlert = function (signeCliniques, numDoss, dateFeuille, nature, codeClinique) {
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
                db.executeSql('insert into SigneCliniqueAlert (codeType ,date ,designation ,quantite ,numDoss ,dateFeuille ,nature,codeClinique) values (?,?,?,?,?,?,?,?)', [
                    s.getcodeType(),
                    s.getdate(),
                    s.getdesignation(),
                    s.getquantite(),
                    numDoss,
                    dateFeuille,
                    nature,
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 SigneCliniqueAlert ' + error);
        });
        db.close();
    };
    SigneCliniqueAlertService.prototype.deleteSigneCliniquesAlert = function (numDoss, dateFeuille, nature, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from SigneCliniqueAlert where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                alert("Suppression de table SigneCliniqueAlert est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 SigneCliniqueAlert  ' + error);
            });
        });
        db.close();
        return this.signeClinique;
    };
    return SigneCliniqueAlertService;
}());
export { SigneCliniqueAlertService };
//# sourceMappingURL=SigneCliniqueAlertService.js.map