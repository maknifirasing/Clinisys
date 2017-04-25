import { TraitCourbe } from "../models/TraitCourbe";
var TraitCourbeService = (function () {
    function TraitCourbeService(sqlite) {
        this.sqlite = sqlite;
        this.traitCourbe = [];
    }
    TraitCourbeService.prototype.verifTraitCourbe = function (traitCourbes, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from TraitCourbe where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 TraitCourbe  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    TraitCourbeService.prototype.getTraitCourbes = function (traitCourbes, numDoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from TraitCourbe where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertTraitCourbes(traitCourbes);
                    }
                    else {
                        var t;
                        for (var i = 0; i < result.rows.length; i++) {
                            t = new TraitCourbe();
                            t.setcodePosologie(result.rows.item(i).codePosologie);
                            t.setcodeType(result.rows.item(i).codeType);
                            t.setdate(result.rows.item(i).date);
                            t.setdesignation(result.rows.item(i).designation);
                            t.setheurePrise(result.rows.item(i).heurePrise);
                            t.setheureRealisation(result.rows.item(i).heureRealisation);
                            t.setnumTraitement(result.rows.item(i).numTraitement);
                            t.setordre(result.rows.item(i).ordre);
                            t.setquantite(result.rows.item(i).quantite);
                            t.setretourn(result.rows.item(i).retourn);
                            t.setrow(result.rows.item(i).row);
                            t.setnumDoss(result.rows.item(i).numDoss);
                            t.setcodeClinique(result.rows.item(i).codeClinique);
                            _this.traitCourbe.push(t);
                        }
                        resolve(_this.traitCourbe);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1 TraitCourbe  ' + error);
                });
            });
            return _this;
        });
    };
    TraitCourbeService.prototype._insertTraitCourbes = function (traitCourbes) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in traitCourbes) {
                if (!traitCourbes.hasOwnProperty(key)) {
                    continue;
                }
                var traitCourbe = traitCourbes[key];
                db.executeSql('insert into TraitCourbe (codePosologie ,codeType ,date ,designation ,heurePrise ,heureRealisation ,numTraitement ,ordre ,quantite ,retourn ,row ,numDoss ,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                    traitCourbe.getcodePosologie(),
                    traitCourbe.getcodeType(),
                    traitCourbe.getdate(),
                    traitCourbe.getdesignation(),
                    traitCourbe.getheurePrise(),
                    traitCourbe.getheureRealisation(),
                    traitCourbe.getnumTraitement(),
                    traitCourbe.getordre(),
                    traitCourbe.getquantite(),
                    traitCourbe.getretourn(),
                    traitCourbe.getrow(),
                    traitCourbe.getnumDoss(),
                    traitCourbe.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Traitement ' + error);
        });
    };
    TraitCourbeService.prototype.deleteTraitCourbes = function (numDoss, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from TraitCourbe where  numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 TraitCourbe  ' + error);
            });
        });
        return this.traitCourbe;
    };
    return TraitCourbeService;
}());
export { TraitCourbeService };
//# sourceMappingURL=TraitCourbeService.js.map