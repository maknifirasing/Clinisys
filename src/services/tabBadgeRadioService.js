import { SQLite } from 'ionic-native';
import { tabBadge } from "../models/tabBadge";
var tabBadgeRadioService = (function () {
    function tabBadgeRadioService() {
        this.tabBadgeRadio = [];
    }
    tabBadgeRadioService.prototype.verifTabBadgeRadio = function (tabBadgeRadios, numDoss, FichierT, FichierF, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            alert("g " + tabBadgeRadios[0].getnumDoss());
            db.executeSql("select * from tabBadgeRadio where numDoss like '" + numDoss + "' and RadioT like '" + FichierT + "'and RadioF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === tabBadgeRadios.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 tabBadgeRadio  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    tabBadgeRadioService.prototype.getTabBadgeRadio = function (tabBadgeRadios, numDoss, FichierT, FichierF, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from tabBadgeRadio where numDoss like '" + numDoss + "' and RadioT like '" + FichierT + "'and RadioF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._inserttabBadgeRadios(tabBadgeRadios, numDoss, FichierT, FichierF, codeClinique);
                }
                else {
                    var t;
                    for (var i = 0; i < result.rows.length; i++) {
                        t = new tabBadge();
                        t.setnumDoss(result.rows.item(i).numDoss);
                        t.setFichierT(result.rows.item(i).FichierT);
                        t.setFichierF(result.rows.item(i).FichierF);
                        _this.tabBadgeRadio.push(t);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 tabBadgeRadio  ' + error);
            });
        });
        db.close();
        return this.tabBadgeRadio;
    };
    tabBadgeRadioService.prototype._inserttabBadgeRadios = function (tabBadgeRadios, numDoss, FichierT, FichierF, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in tabBadgeRadios) {
                if (!tabBadgeRadios.hasOwnProperty(key)) {
                    continue;
                }
                var tabBadgeRadio = tabBadgeRadios[key];
                db.executeSql('insert into tabBadgeRadios (codeClinique,numDoss,RadioT,RadioF) values (?,?,?,?)', [
                    codeClinique,
                    tabBadgeRadio.getnumDoss(),
                    tabBadgeRadio.getFichierT(),
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 tabBadgeRadio ' + error);
        });
        db.close();
    };
    tabBadgeRadioService.prototype.deletetabBadgeRadios = function (numDoss, FichierT, FichierF, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from tabBadgeRadios where numDoss like '" + numDoss + "' and RadioT like '" + FichierT + "'and RadioF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Traitement  ' + error);
            });
        });
        db.close();
        return this.tabBadgeRadio;
    };
    return tabBadgeRadioService;
}());
export { tabBadgeRadioService };
//# sourceMappingURL=tabBadgeRadioService.js.map