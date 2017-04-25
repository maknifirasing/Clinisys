import { Traitement } from "../models/Traitement";
var TraitementService = (function () {
    function TraitementService(sqlite) {
        this.sqlite = sqlite;
        this.traitement = [];
    }
    TraitementService.prototype.verifTraitement = function (traitements, numDoss, datefeuille, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from Traitement where numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 Traitement  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    TraitementService.prototype.getTraitements = function (traitements, numDoss, datefeuille, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from Traitement where numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertTraitements(traitements, datefeuille, codeClinique);
                }
                else {
                    var t;
                    for (var i = 0; i < result.rows.length; i++) {
                        t = new Traitement();
                        t.setnumDoss(result.rows.item(i).numDoss);
                        t.setdesignation(result.rows.item(i).designation);
                        t.setjour(result.rows.item(i).jour);
                        t.setposologie(result.rows.item(i).posologie);
                        _this.traitement.push(t);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Traitement  ' + error);
            });
        });
        return this.traitement;
    };
    TraitementService.prototype._insertTraitements = function (traitements, datefeuille, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in traitements) {
                if (!traitements.hasOwnProperty(key)) {
                    continue;
                }
                var traitement = traitements[key];
                db.executeSql('insert into Traitement (numDoss,designation ,jour ,posologie ,datefeuille,codeClinique) values (?,?,?,?,?,?)', [
                    traitement.getnumDoss(),
                    traitement.getdesignation(),
                    traitement.getjour(),
                    traitement.getposologie(),
                    datefeuille,
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Traitement ' + error);
        });
    };
    TraitementService.prototype.deleteTraitements = function (numDoss, datefeuille, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from Traitement where  numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Traitement  ' + error);
            });
        });
        return this.traitement;
    };
    return TraitementService;
}());
export { TraitementService };
//# sourceMappingURL=TraitementService.js.map