import { SQLite } from 'ionic-native';
import { HistPatient } from "../models/HistPatient";
var HistPatientService = (function () {
    function HistPatientService() {
        this.histPatient = [];
    }
    HistPatientService.prototype.verifHistPatient = function (user, searchText, etage, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 1) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 HistPatient  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    HistPatientService.prototype.getHistPatients = function (histPatients, user, searchText, etage, codeClinique) {
        var _this = this;
        this.histPatient.push(histPatients[0]);
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertHistPatients(histPatients);
                }
                else {
                    _this.histPatient.pop();
                    _this.histPatient = [];
                    _this.histPatient.length = 0;
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
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1.1 HistPatient  ' + error);
            });
        });
        db.close();
        return this.histPatient;
    };
    HistPatientService.prototype.getHistPatientsOff = function (histPatients, user, searchText, etage, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    return _this.histPatient;
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
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1.2 HistPatient  ' + error);
            });
        });
        db.close();
        return this.histPatient;
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