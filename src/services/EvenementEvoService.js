import { SQLite } from 'ionic-native';
import { Evenement } from "../models/Evenement";
var EvenementEvoService = (function () {
    function EvenementEvoService() {
        this.evenement = [];
    }
    EvenementEvoService.prototype.verifEvenement = function (evenements, numdoss, codeClinique) {
        var _this = this;
        this.verif = false;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from EvenementEvo where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === evenements.length) {
                    _this.verif = true;
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 0 EvenementEvo  ' + error);
            });
        });
        db.close();
        return this.verif;
    };
    EvenementEvoService.prototype.getEvenements = function (evenements, numdoss, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from EvenementEvo where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertEvenements(evenements, codeClinique);
                }
                else {
                    var e;
                    for (var i = 0; i < result.rows.length; i++) {
                        e = new Evenement();
                        e.setaccess(result.rows.item(i).access);
                        e.setcode(result.rows.item(i).code);
                        e.setevenements(result.rows.item(i).evenements);
                        e.setorderEvenement(result.rows.item(i).orderEvenement);
                        e.setvisible(result.rows.item(i).visible);
                        e.setdate(result.rows.item(i).date);
                        e.setdetail(result.rows.item(i).detail);
                        e.setIDEvenement(result.rows.item(i).IDEvenement);
                        e.setnumdoss(result.rows.item(i).numdoss);
                        e.setuserCreat(result.rows.item(i).userCreat);
                        _this.evenement.push(e);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 EvenementEvo  ' + error);
            });
        });
        db.close();
        return this.evenement;
    };
    EvenementEvoService.prototype._insertEvenements = function (evenements, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in evenements) {
                if (!evenements.hasOwnProperty(key)) {
                    continue;
                }
                var evenement = evenements[key];
                db.executeSql('insert into EvenementEvo (access ,code ,evenements ' +
                    ',orderEvenement ,visible ,date ,detail ,IDEvenement ,numdoss ,userCreat,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?)', [
                    evenement.getaccess(),
                    evenement.getcode(),
                    evenement.getevenements(),
                    evenement.getorderEvenement(),
                    evenement.getvisible(),
                    evenement.getdate(),
                    evenement.getdetail(),
                    evenement.getIDEvenement(),
                    evenement.getnumdoss(),
                    evenement.getuserCreat(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 EvenementEvo ' + error);
        });
        db.close();
    };
    EvenementEvoService.prototype.deleteEvenementEvos = function (numdoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from EvenementEvo where  numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table EvenementEvo est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 EvenementEvo  ' + error);
            });
        });
        db.close();
        return this.evenement;
    };
    return EvenementEvoService;
}());
export { EvenementEvoService };
//# sourceMappingURL=EvenementEvoService.js.map