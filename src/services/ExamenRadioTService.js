import { ExamenRadio } from "../models/ExamenRadio";
var ExamenRadioTService = (function () {
    function ExamenRadioTService(sqlite) {
        this.sqlite = sqlite;
        this.examenRadio = [];
    }
    ExamenRadioTService.prototype.verifExamenRadio = function (examenRadios, numeroDossier, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from ExamenRadioT where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
                     //alert('Error 0 ExamenRadioT  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    ExamenRadioTService.prototype.getExamenRadios = function (examenRadios, numeroDossier, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from ExamenRadioT where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
                //console.error('Error opening database', error);
                 //alert('Error 1 ExamenRadioT  ' + error);
            });
        });
        return this.examenRadio;
    };
    ExamenRadioTService.prototype._insertExamenRadios = function (examenRadios, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in examenRadios) {
                if (!examenRadios.hasOwnProperty(key)) {
                    continue;
                }
                var examenRadio = examenRadios[key];
                db.executeSql('insert into ExamenRadioT (compterendu,dateExamen,designationExamen,numeroDossier,observ,codeClinique) values (?,?,?,?,?,?)', [
                    examenRadio.getcompterendu(),
                    examenRadio.getdateExamen(),
                    examenRadio.getdesignationExamen(),
                    examenRadio.getnumeroDossier(),
                    examenRadio.getobserv(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 ExamenRadioT ' + error);
        });
    };
    ExamenRadioTService.prototype.deleteExamenRadios = function (numeroDossier, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from ExamenRadioT where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //     //alert("Suppression de table ExamenRadioT est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 ExamenRadioT  ' + error);
            });
        });
        return this.examenRadio;
    };
    return ExamenRadioTService;
}());
export { ExamenRadioTService };
//# sourceMappingURL=ExamenRadioTService.js.map
