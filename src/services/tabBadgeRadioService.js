import { tabBadge } from "../models/tabBadge";
var tabBadgeRadioService = (function () {
    function tabBadgeRadioService(sqlite) {
        this.sqlite = sqlite;
        this.tabBadgeRadio = [];
    }
    tabBadgeRadioService.prototype.verifTabBadgeRadio = function (numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from tabBadgeRadio where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    //console.error('Error opening database', error);
                     //alert('Error 0 tabBadgeRadio  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    tabBadgeRadioService.prototype.getTabBadgeRadio = function (tabBadgeRadios, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from tabBadgeRadio where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._inserttabBadgeRadios(tabBadgeRadios);
                    }
                    else {
                        var t;
                        for (var i = 0; i < result.rows.length; i++) {
                            t = new tabBadge();
                            t.setnumDoss(result.rows.item(i).numDoss);
                            t.setFichierT(result.rows.item(i).RadioT);
                            t.setFichier(result.rows.item(i).Radio);
                            _this.tabBadgeRadio.push(t);
                        }
                        resolve(_this.tabBadgeRadio[0]);
                    }
                })
                    .catch(function (error) {
                    //console.error('Error opening database', error);
                     //alert('Error 1 tabBadgeRadio  ' + error);
                });
            });
            return _this;
        });
    };
    tabBadgeRadioService.prototype._inserttabBadgeRadios = function (tabBadgeRadios) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in tabBadgeRadios) {
                if (!tabBadgeRadios.hasOwnProperty(key)) {
                    continue;
                }
                var tabBadgeRadio = tabBadgeRadios[key];
                db.executeSql('insert into tabBadgeRadio (codeClinique,numDoss,RadioT,Radio) values (?,?,?,?)', [
                    tabBadgeRadio.getcodeClinique(),
                    tabBadgeRadio.getnumDoss(),
                    tabBadgeRadio.getFichierT(),
                    tabBadgeRadio.getFichier()
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 tabBadgeRadio ' + error);
        });
    };
    tabBadgeRadioService.prototype.deletetabBadgeRadios = function (numDoss, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from tabBadgeRadio where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //    //alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 tabBadgeRadio  ' + error);
            });
        });
        return this.tabBadgeRadio;
    };
    return tabBadgeRadioService;
}());
export { tabBadgeRadioService };
//# sourceMappingURL=tabBadgeRadioService.js.map
