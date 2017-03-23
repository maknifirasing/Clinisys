import { SQLite } from 'ionic-native';
import { Langue } from "../models/Langue";
var LangueService = (function () {
    function LangueService() {
        this.langue = [];
    }
    LangueService.prototype.verifLangue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from Langue ", [])
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
                    alert('Error 0 Langue  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    LangueService.prototype.getLangues = function (langues) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from Langue ", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertLangues(langues);
                        resolve(langues[0]);
                    }
                    else {
                        var l;
                        for (var i = 0; i < result.rows.length; i++) {
                            l = new Langue();
                            l.setlangue(result.rows.item(i).langue);
                            _this.langue.push(l);
                        }
                        resolve(_this.langue[0]);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1 Langue  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    LangueService.prototype._insertLangues = function (langues) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in langues) {
                if (!langues.hasOwnProperty(key)) {
                    continue;
                }
                var langue = langues[key];
                db.executeSql('insert into Langue (langue) values (?)', [
                    langue.getlangue()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Langue ' + error);
        });
        db.close();
    };
    LangueService.prototype.deleteLangues = function () {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Langue ", [])
                .then(function () {
                //    alert("Suppression de table Aleg est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Langue  ' + error);
            });
        });
        db.close();
        return this.langue;
    };
    return LangueService;
}());
export { LangueService };
//# sourceMappingURL=LangueService.js.map