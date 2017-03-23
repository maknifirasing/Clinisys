import { SQLite } from 'ionic-native';
import { Patient } from "../models/Patient";
var PatientService = (function () {
    function PatientService() {
        this.patient = [];
    }
    PatientService.prototype.verifPatient = function (patients, user, searchText, etage, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sums from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 Patient  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    PatientService.prototype.getPatients = function (patients, user, searchText, etage, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertPatients(patients, user, searchText, etage, codeClinique);
                }
                else {
                    var p;
                    for (var i = 0; i < result.rows.length; i++) {
                        p = new Patient();
                        p.setid(result.rows.item(i).id);
                        p.setdossier(result.rows.item(i).dossier);
                        p.setchambre(result.rows.item(i).chambre);
                        p.setprenom(result.rows.item(i).prenom);
                        p.setnom(result.rows.item(i).nom);
                        p.setdateNaiss(result.rows.item(i).dateNaiss);
                        p.setmedecin(result.rows.item(i).medecin);
                        p.setspec(result.rows.item(i).spec);
                        p.setetat(result.rows.item(i).etat);
                        p.setnature(result.rows.item(i).nature);
                        p.setage(result.rows.item(i).age);
                        p.setimg(result.rows.item(i).img);
                        _this.patient.push(p);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Patient  ' + error);
            });
        });
        db.close();
        return this.patient;
    };
    PatientService.prototype._insertPatients = function (patients, user, searchText, etage, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in patients) {
                if (!patients.hasOwnProperty(key)) {
                    continue;
                }
                var patient = patients[key];
                db.executeSql('insert into Patient (id ,dossier ,chambre ,nom ,prenom ,dateNaiss, medecin, spec, etat, age, img, nature ,user, searchText ,etage,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                    patient.getid(),
                    patient.getdossier(),
                    patient.getchambre(),
                    patient.getnom(),
                    patient.getprenom(),
                    patient.getdateNaiss(),
                    patient.getmedecin(),
                    patient.getspec(),
                    patient.getetat(),
                    patient.getage(),
                    patient.getimg(),
                    patient.getnature(),
                    user,
                    searchText,
                    etage,
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Patient ' + error);
        });
        db.close();
    };
    PatientService.prototype.deletePatients = function (user, searchText, etage, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //  alert("Suppression de table Patient est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Patient  ' + error);
            });
        });
        db.close();
        return this.patient;
    };
    return PatientService;
}());
export { PatientService };
//# sourceMappingURL=PatientService.js.map