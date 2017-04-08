import { SQLite } from 'ionic-native';
import { tabBadge } from "../models/tabBadge";
var tabBadgeConsigneService = (function () {
    function tabBadgeConsigneService() {
        this.tabBadgeConsigne = [];
    }
    tabBadgeConsigneService.prototype.verifTabBadgeConsigne = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from tabBadgeConsigne where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 tabBadgeConsigne  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    tabBadgeConsigneService.prototype.getTabBadgeConsigne = function (tabBadgeConsignes, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from tabBadgeConsigne where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._inserttabBadgeConsignes(tabBadgeConsignes);
                    }
                    else {
                        var t;
                        for (var i = 0; i < result.rows.length; i++) {
                            t = new tabBadge();
                            t.setcodeClinique(result.rows.item(i).codeClinique);
                            t.setnumDoss(result.rows.item(i).numDoss);
                            t.setFichierT(result.rows.item(i).consigneT);
                            t.setFichier(result.rows.item(i).consignes);
                            _this.tabBadgeConsigne.push(t);
                        }
                        resolve(_this.tabBadgeConsigne[0]);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1 tabBadgeConsigne  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    tabBadgeConsigneService.prototype._inserttabBadgeConsignes = function (tabBadgeConsignes) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in tabBadgeConsignes) {
                if (!tabBadgeConsignes.hasOwnProperty(key)) {
                    continue;
                }
                var tabBadgeConsigne = tabBadgeConsignes[key];
                db.executeSql('insert into tabBadgeConsigne (codeClinique,numDoss,consigneT,consignes) values (?,?,?,?)', [
                    tabBadgeConsigne.getcodeClinique(),
                    tabBadgeConsigne.getnumDoss(),
                    tabBadgeConsigne.getFichierT(),
                    tabBadgeConsigne.getFichier()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 tabBadgeConsigne ' + error);
        });
        db.close();
    };
    tabBadgeConsigneService.prototype.deletetabBadgeConsignes = function (numDoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from tabBadgeConsigne where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 tabBadgeConsignes  ' + error);
            });
        });
        db.close();
        return this.tabBadgeConsigne;
    };
    return tabBadgeConsigneService;
}());
export { tabBadgeConsigneService };
//# sourceMappingURL=tabBadgeConsigneService.js.map