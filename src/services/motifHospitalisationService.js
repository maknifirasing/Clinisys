import { SQLite } from 'ionic-native';
import { MotifHospitalisation } from "../models/motifHospitalisation";
var motifHospitalisationService = (function () {
    function motifHospitalisationService() {
        this.motifhospitalisation = [];
    }
    motifHospitalisationService.prototype.verifmotifHospitalisation = function (motifhospitalisations, numdoss, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === motifhospitalisations.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 motifHospitalisation  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    motifHospitalisationService.prototype.getmotifHospitalisations = function (motifhospitalisations, numdoss, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertmotifHospitalisations(motifhospitalisations, codeClinique);
                }
                else {
                    var m;
                    for (var i = 0; i < result.rows.length; i++) {
                        m = new MotifHospitalisation();
                        m.setconclusion(result.rows.item(0).conclusion);
                        m.setdateRdv(result.rows.item(0).dateRdv);
                        m.setdateSortie(result.rows.item(0).dateSortie);
                        m.setgroupeSang(result.rows.item(0).groupeSang);
                        m.setheureRdv(result.rows.item(0).heureRdv);
                        m.setheureSortie(result.rows.item(0).heureSortie);
                        m.sethistoiremaladie(result.rows.item(0).histoiremaladie);
                        m.setmotifhospitalisation(result.rows.item(0).motifhospitalisation);
                        m.setnumdoss(result.rows.item(0).numdoss);
                        m.setobservationSejour(result.rows.item(0).observationSejour);
                        m.setpoid(result.rows.item(0).poid);
                        m.settaille(result.rows.item(0).taille);
                        m.settraitementHabituelle(result.rows.item(0).traitementHabituelle);
                        m.settraitementSejour(result.rows.item(0).traitementSejour);
                        m.settraitementSortie(result.rows.item(0).traitementSortie);
                        m.setutilisateurMotif(result.rows.item(0).utilisateurMotif);
                        _this.motifhospitalisation.push(m);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 motifHospitalisation  ' + error);
            });
        });
        db.close();
        return this.motifhospitalisation;
    };
    motifHospitalisationService.prototype._insertmotifHospitalisations = function (motifhospitalisations, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in motifhospitalisations) {
                if (!motifhospitalisations.hasOwnProperty(key)) {
                    continue;
                }
                var motifhospitalisation = motifhospitalisations[key];
                db.executeSql('insert into motifHospitalisation (conclusion ,dateRdv ,dateSortie' +
                    ',groupeSang ,heureRdv, heureSortie ,histoiremaladie ,motifhospitalisation ,numdoss ,observationSejour ,poid ,taille ,traitementHabituelle ,traitementSejour ,traitementSortie ,utilisateurMotif,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                    motifhospitalisation.getconclusion(),
                    motifhospitalisation.getdateRdv(),
                    motifhospitalisation.getdateSortie(),
                    motifhospitalisation.getgroupeSang(),
                    motifhospitalisation.getheureRdv(),
                    motifhospitalisation.getheureSortie(),
                    motifhospitalisation.gethistoiremaladie(),
                    motifhospitalisation.getmotifhospitalisation(),
                    motifhospitalisation.getnumdoss(),
                    motifhospitalisation.getobservationSejour(),
                    motifhospitalisation.getpoid(),
                    motifhospitalisation.gettaille(),
                    motifhospitalisation.gettraitementHabituelle(),
                    motifhospitalisation.gettraitementSejour(),
                    motifhospitalisation.gettraitementSortie(),
                    motifhospitalisation.getutilisateurMotif(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 motifHospitalisation ' + error);
        });
        db.close();
    };
    motifHospitalisationService.prototype.deleteMotifhospitalisations = function (numdoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Motifhospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //      alert("Suppression de table Motifhospitalisation est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Motifhospitalisation  ' + error);
            });
        });
        db.close();
        return this.motifhospitalisation;
    };
    return motifHospitalisationService;
}());
export { motifHospitalisationService };
//# sourceMappingURL=motifHospitalisationService.js.map