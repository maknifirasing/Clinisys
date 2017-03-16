import { SQLite } from 'ionic-native';
import { tabBadge } from "../models/tabBadge";
var tabBadgeActeService = (function () {
    function tabBadgeActeService() {
        this.tabBadgeActe = [];
    }
    tabBadgeActeService.prototype.verifTabBadgeActe = function (tabBadgeActes, numDoss, FichierT, FichierF, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            alert("g " + tabBadgeActes[0].getnumDoss());
            db.executeSql("select * from tabBadgeActe where numDoss like '" + numDoss + "' and ActeT like '" + FichierT + "'and ActeF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === tabBadgeActes.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 tabBadgeActe  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    tabBadgeActeService.prototype.getTabBadgeActe = function (tabBadgeActes, numDoss, FichierT, FichierF, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from tabBadgeActe where numDoss like '" + numDoss + "' and ActeT like '" + FichierT + "'and ActeF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._inserttabBadgeActes(tabBadgeActes, numDoss, FichierT, FichierF, codeClinique);
                }
                else {
                    var t;
                    for (var i = 0; i < result.rows.length; i++) {
                        t = new tabBadge();
                        t.setnumDoss(result.rows.item(i).numDoss);
                        t.setFichierT(result.rows.item(i).FichierT);
                        t.setFichierF(result.rows.item(i).FichierF);
                        _this.tabBadgeActe.push(t);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 tabBadgeActe  ' + error);
            });
        });
        db.close();
        return this.tabBadgeActe;
    };
    tabBadgeActeService.prototype._inserttabBadgeActes = function (tabBadgeActes, numDoss, FichierT, FichierF, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in tabBadgeActes) {
                if (!tabBadgeActes.hasOwnProperty(key)) {
                    continue;
                }
                var tabBadgeActe = tabBadgeActes[key];
                db.executeSql('insert into tabBadgeActes (codeClinique,numDoss,ActeT,ActeF) values (?,?,?,?)', [
                    codeClinique,
                    tabBadgeActe.getnumDoss(),
                    tabBadgeActe.getFichierT(),
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 tabBadgeActe ' + error);
        });
        db.close();
    };
    tabBadgeActeService.prototype.deletetabBadgeActes = function (numDoss, FichierT, FichierF, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from tabBadgeActes where numDoss like '" + numDoss + "' and ActeT like '" + FichierT + "'and ActeF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Traitement  ' + error);
            });
        });
        db.close();
        return this.tabBadgeActe;
    };
    return tabBadgeActeService;
}());
export { tabBadgeActeService };
//# sourceMappingURL=tabBadgeActeService.js.map