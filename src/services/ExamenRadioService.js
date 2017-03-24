import { SQLite } from 'ionic-native';
import { ExamenRadio } from "../models/ExamenRadio";
var ExamenRadioService = (function () {
    function ExamenRadioService() {
        this.examenRadio = [];
    }
    ExamenRadioService.prototype.verifExamenRadio = function (examenRadios, observ, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from ExamenRadio where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === examenRadios.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 ExamenRadio  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    ExamenRadioService.prototype.getExamenRadios = function (examenRadios, observ, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from ExamenRadio where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertExamenRadios(examenRadios, codeClinique);
                }
                else {
                    var ex;
                    for (var i = 0; i < result.rows.length; i++) {
                        ex = new ExamenRadio();
                        ex.setcodeExamen(result.rows.item(i).codeExamen);
                        ex.setcompterendu(result.rows.item(i).compterendu);
                        ex.setdateExamen(result.rows.item(i).dateExamen);
                        ex.setdatePrevu(result.rows.item(i).datePrevu);
                        ex.setdate_RDV(result.rows.item(i).date_RDV);
                        ex.setdesignationExamen(result.rows.item(i).designationExamen);
                        ex.setheurePrevu(result.rows.item(i).heurePrevu);
                        ex.setidres(result.rows.item(i).idres);
                        ex.setmedecin(result.rows.item(i).medecin);
                        ex.setnature(result.rows.item(i).nature);
                        ex.setnumeroDossier(result.rows.item(i).numeroDossier);
                        ex.setnumeroExamen(result.rows.item(i).numeroExamen);
                        ex.setobserv(result.rows.item(i).observ);
                        ex.setresultat(result.rows.item(i).resultat);
                        _this.examenRadio.push(ex);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 ExamenRadio  ' + error);
            });
        });
        db.close();
        return this.examenRadio;
    };
    ExamenRadioService.prototype._insertExamenRadios = function (examenRadios, codeClinique) {
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
                db.executeSql('insert into ExamenRadio (codeExamen,compterendu ,dateExamen ' +
                    ',datePrevu, date_RDV,designationExamen,heurePrevu,idres,medecin,nature,numeroDossier,numeroExamen,observ,resultat,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                    examenRadio.getcodeExamen(),
                    examenRadio.getcompterendu(),
                    examenRadio.getdateExamen(),
                    examenRadio.getdatePrevu(),
                    examenRadio.getdate_RDV(),
                    examenRadio.getdesignationExamen(),
                    examenRadio.getheurePrevu(),
                    examenRadio.getidres(),
                    examenRadio.getmedecin(),
                    examenRadio.getnature(),
                    examenRadio.getnumeroDossier(),
                    examenRadio.getnumeroExamen(),
                    examenRadio.getobserv(),
                    examenRadio.getresultat(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 ExamenRadio ' + error);
        });
        db.close();
    };
    ExamenRadioService.prototype.deleteExamenRadios = function (observ, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from ExamenRadio where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                alert("Suppression de table ExamenRadio est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 ExamenRadio  ' + error);
            });
        });
        db.close();
        return this.examenRadio;
    };
    return ExamenRadioService;
}());
export { ExamenRadioService };
//# sourceMappingURL=ExamenRadioService.js.map