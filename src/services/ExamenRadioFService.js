import { SQLite } from 'ionic-native';
import { ExamenRadio } from "../models/ExamenRadio";
var ExamenRadioFService = (function () {
    function ExamenRadioFService() {
        this.examenRadio = [];
    }
    ExamenRadioFService.prototype.verifExamenRadio = function (examenRadios, numeroDossier, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from ExamenRadioF where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 ExamenRadioF  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    ExamenRadioFService.prototype.getExamenRadios = function (examenRadios, numeroDossier, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from ExamenRadioF where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertExamenRadios(examenRadios, codeClinique);
                }
                else {
                    var ex;
                    for (var i = 0; i < result.rows.length; i++) {
                        ex = new ExamenRadio();
                        ex.setcompterendu(result.rows.item(i).compterendu);
                        ex.setdateExamen(result.rows.item(i).dateExamen);
                        ex.setdesignationExamen(result.rows.item(i).designationExamen);
                        ex.setnumeroDossier(result.rows.item(i).numeroDossier);
                        ex.setobserv(result.rows.item(i).observ);
                        _this.examenRadio.push(ex);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 ExamenRadioF  ' + error);
            });
        });
        db.close();
        return this.examenRadio;
    };
    ExamenRadioFService.prototype._insertExamenRadios = function (examenRadios, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in examenRadios) {
                if (!examenRadios.hasOwnProperty(key)) {
                    continue;
                }
                var examenRadio = examenRadios[key];
                db.executeSql('insert into ExamenRadioF (compterendu,dateExamen,designationExamen,numeroDossier,observ,codeClinique) values (?,?,?,?,?,?)', [
                    examenRadio.getcompterendu(),
                    examenRadio.getdateExamen(),
                    examenRadio.getdesignationExamen(),
                    examenRadio.getnumeroDossier(),
                    examenRadio.getobserv(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 ExamenRadioF ' + error);
        });
        db.close();
    };
    ExamenRadioFService.prototype.deleteExamenRadios = function (numeroDossier, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from ExamenRadioF where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table ExamenRadioF est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 ExamenRadioF  ' + error);
            });
        });
        db.close();
        return this.examenRadio;
    };
    return ExamenRadioFService;
}());
export { ExamenRadioFService };
//# sourceMappingURL=ExamenRadioFService.js.map