import { Evenement } from "../models/Evenement";
var EvenementExaService = (function () {
    function EvenementExaService(sqlite) {
        this.sqlite = sqlite;
        this.evenement = [];
    }
    EvenementExaService.prototype.verifEvenement = function (evenements, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum  from EvenementExa where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 EvenementExa  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    EvenementExaService.prototype.getEvenements = function (evenements, numdoss, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from EvenementExa where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertEvenements(evenements, codeClinique);
                }
                else {
                    var e;
                    for (var i = 0; i < result.rows.length; i++) {
                        e = new Evenement();
                        e.setevenements(result.rows.item(i).evenements);
                        e.setdate(result.rows.item(i).date);
                        e.setdetail(result.rows.item(i).detail);
                        e.setnumdoss(result.rows.item(i).numdoss);
                        e.setuserCreat(result.rows.item(i).userCreat);
                        _this.evenement.push(e);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 EvenementExa  ' + error);
            });
        });
        return this.evenement;
    };
    EvenementExaService.prototype._insertEvenements = function (evenements, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in evenements) {
                if (!evenements.hasOwnProperty(key)) {
                    continue;
                }
                var evenement = evenements[key];
                db.executeSql('insert into EvenementExa (evenements ' +
                    ',date ,detail ,numdoss ,userCreat,codeClinique) values (?,?,?,?,?,?)', [
                    evenement.getevenements(),
                    evenement.getdate(),
                    evenement.getdetail(),
                    evenement.getnumdoss(),
                    evenement.getuserCreat(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 EvenementExa ' + error);
        });
    };
    EvenementExaService.prototype.deleteEvenementExas = function (numdoss, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from EvenementExa where  numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //    alert("Suppression de table EvenementExa est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 EvenementExa  ' + error);
            });
        });
        return this.evenement;
    };
    return EvenementExaService;
}());
export { EvenementExaService };
//# sourceMappingURL=EvenementExaService.js.map