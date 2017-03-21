import { SQLite } from 'ionic-native';
import { tabBadge } from "../models/tabBadge";
var tabBadgeLaboService = (function () {
    function tabBadgeLaboService() {
        this.tabBadgeLabo = [];
    }
    tabBadgeLaboService.prototype.verifTabBadgeLabo = function (tabBadgeLabos, numDoss, FichierT, FichierF, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            alert("g " + tabBadgeLabos[0].getnumDoss());
            db.executeSql("select * from tabBadgeLabo where numDoss like '" + numDoss + "' and LabosT like '" + FichierT + "'and LabosF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === tabBadgeLabos.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 tabBadgeLabo  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    tabBadgeLaboService.prototype.getTabBadgeLabo = function (tabBadgeLabos, numDoss, FichierT, Fichier, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from tabBadgeLabo where numDoss like '" + numDoss + "' and LabosT like '" + FichierT + "'and Labos like '" + Fichier + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._inserttabBadgeLabos(tabBadgeLabos, numDoss, FichierT, Fichier, codeClinique);
                }
                else {
                    var t;
                    for (var i = 0; i < result.rows.length; i++) {
                        t = new tabBadge();
                        t.setnumDoss(result.rows.item(i).numDoss);
                        t.setFichierT(result.rows.item(i).FichierT);
                        t.setFichierF(result.rows.item(i).FichierF);
                        _this.tabBadgeLabo.push(t);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 tabBadgeLabo  ' + error);
            });
        });
        db.close();
        return this.tabBadgeLabo;
    };
    tabBadgeLaboService.prototype._inserttabBadgeLabos = function (tabBadgeLabos, numDoss, FichierT, Fichier, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in tabBadgeLabos) {
                if (!tabBadgeLabos.hasOwnProperty(key)) {
                    continue;
                }
                var tabBadgeLabo = tabBadgeLabos[key];
                db.executeSql('insert into tabBadgeLabos (codeClinique,numDoss,LabosT,LabosF) values (?,?,?,?)', [
                    codeClinique,
                    tabBadgeLabo.getnumDoss(),
                    tabBadgeLabo.getFichierT(),
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 tabBadgeLabo ' + error);
        });
        db.close();
    };
    tabBadgeLaboService.prototype.deletetabBadgeLabos = function (numDoss, FichierT, FichierF, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from tabBadgeLabos where numDoss like '" + numDoss + "' and LabosT like '" + FichierT + "'and LabosF like '" + FichierF + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Traitement  ' + error);
            });
        });
        db.close();
        return this.tabBadgeLabo;
    };
    return tabBadgeLaboService;
}());
export { tabBadgeLaboService };
//# sourceMappingURL=tabBadgeLaboService.js.map