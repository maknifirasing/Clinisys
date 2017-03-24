import { SQLite } from 'ionic-native';
import { tabBadge } from "../models/tabBadge";
var tabBadgeLaboService = (function () {
    function tabBadgeLaboService() {
        this.tabBadgeLabo = [];
    }
    tabBadgeLaboService.prototype.verifTabBadgeLabo = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from tabBadgeLabo where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 tabBadgeLabo  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    tabBadgeLaboService.prototype.getTabBadgeLabo = function (tabBadgeLabos, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from tabBadgeLabo where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._inserttabBadgeLabos(tabBadgeLabos);
                    }
                    else {
                        var t;
                        for (var i = 0; i < result.rows.length; i++) {
                            t = new tabBadge();
                            t.setcodeClinique(result.rows.item(i).codeClinique);
                            t.setnumDoss(result.rows.item(i).numDoss);
                            t.setFichierT(result.rows.item(i).LabosT);
                            t.setFichier(result.rows.item(i).Labos);
                            _this.tabBadgeLabo.push(t);
                        }
                        resolve(_this.tabBadgeLabo[0]);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1 tabBadgeLabo  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    tabBadgeLaboService.prototype._inserttabBadgeLabos = function (tabBadgeLabos) {
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
                db.executeSql('insert into tabBadgeLabo (codeClinique,numDoss,LabosT,Labos) values (?,?,?,?)', [
                    tabBadgeLabo.getcodeClinique(),
                    tabBadgeLabo.getnumDoss(),
                    tabBadgeLabo.getFichierT(),
                    tabBadgeLabo.getFichier()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 tabBadgeLabo ' + error);
        });
        db.close();
    };
    tabBadgeLaboService.prototype.deletetabBadgeLabos = function (numDoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from tabBadgeLabo where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 tabBadgeLabos  ' + error);
            });
        });
        db.close();
        return this.tabBadgeLabo;
    };
    return tabBadgeLaboService;
}());
export { tabBadgeLaboService };
//# sourceMappingURL=tabBadgeLaboService.js.map