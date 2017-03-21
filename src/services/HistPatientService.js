import { SQLite } from 'ionic-native';
import { HistPatient } from "../models/HistPatient";
var HistPatientService = (function () {
    function HistPatientService() {
        this.histPatient = [];
    }
    HistPatientService.prototype.verifHistPatient = function (user, searchText, etage, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 HistPatient  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    HistPatientService.prototype.getHistPatients = function (histPatients, user, searchText, etage, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertHistPatients(histPatients);
                        resolve(histPatients[0]);
                    }
                    else {
                        var p;
                        for (var i = 0; i < result.rows.length; i++) {
                            p = new HistPatient();
                            p.setuser(result.rows.item(i).user);
                            p.setsearchText(result.rows.item(i).searchText);
                            p.setetage(result.rows.item(i).etage);
                            p.setdate(result.rows.item(i).date);
                            p.setcodeClinique(result.rows.item(i).codeClinique);
                            _this.histPatient.push(p);
                        }
                        resolve(_this.histPatient[0]);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1.1 HistPatient  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    HistPatientService.prototype._insertHistPatients = function (histPatients) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in histPatients) {
                if (!histPatients.hasOwnProperty(key)) {
                    continue;
                }
                var histPatient = histPatients[key];
                db.executeSql('insert into HistPatient (user ,searchText ,etage ,date ,codeClinique) values (?,?,?,?,?)', [
                    histPatient.getuser(),
                    histPatient.getsearchText(),
                    histPatient.getetage(),
                    histPatient.getdate(),
                    histPatient.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 HistPatient ' + error);
        });
        db.close();
    };
    HistPatientService.prototype.deleteHistPatients = function (user, searchText, etage, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //  alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 HistPatient  ' + error);
            });
        });
        db.close();
        return this.histPatient;
    };
    return HistPatientService;
}());
export { HistPatientService };
//# sourceMappingURL=HistPatientService.js.map