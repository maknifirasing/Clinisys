import { SQLite } from 'ionic-native';
import { tabBadge } from "../models/tabBadge";
var tabBadgeListPreanesthesie = (function () {
    function tabBadgeListPreanesthesie() {
        this.tabBadgeList = [];
    }
    tabBadgeListPreanesthesie.prototype.verifTabBadgeList = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from tabBadgeListPreanesthesie where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 tabBadgeListPreanesthesie  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    tabBadgeListPreanesthesie.prototype.getTabBadgeList = function (tabBadgeLists, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from tabBadgeListPreanesthesie where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._inserttabBadgeLists(tabBadgeLists);
                    }
                    else {
                        var t;
                        for (var i = 0; i < result.rows.length; i++) {
                            t = new tabBadge();
                            t.setcodeClinique(result.rows.item(i).codeClinique);
                            t.setnumDoss(result.rows.item(i).numDoss);
                            t.setFichierT(0);
                            t.setFichier(result.rows.item(i).ListPreanesthesie);
                            _this.tabBadgeList.push(t);
                        }
                        resolve(_this.tabBadgeList[0]);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1 tabBadgeListPreanesthesie  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    tabBadgeListPreanesthesie.prototype._inserttabBadgeLists = function (tabBadgeLists) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in tabBadgeLists) {
                if (!tabBadgeLists.hasOwnProperty(key)) {
                    continue;
                }
                var tabBadgeList = tabBadgeLists[key];
                db.executeSql('insert into tabBadgeListPreanesthesie (codeClinique,numDoss,ListPreanesthesie) values (?,?,?)', [
                    tabBadgeList.getcodeClinique(),
                    tabBadgeList.getnumDoss(),
                    tabBadgeList.getFichier()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 tabBadgeListPreanesthesie ' + error);
        });
        db.close();
    };
    tabBadgeListPreanesthesie.prototype.deletetabBadgeLists = function (numDoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from tabBadgeListPreanesthesie where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 tabBadgeListPreanesthesie  ' + error);
            });
        });
        db.close();
        return this.tabBadgeList;
    };
    return tabBadgeListPreanesthesie;
}());
export { tabBadgeListPreanesthesie };
//# sourceMappingURL=tabBadgeListPreanesthesie.js.map