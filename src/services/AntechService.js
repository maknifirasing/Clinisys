import { AntecCh } from "../models/AntecCh";
var AntechService = (function () {
    function AntechService(sqlite) {
        this.sqlite = sqlite;
        this.antec = [];
    }
    AntechService.prototype.verifAntec = function (antecs, idpass, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from Antech where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
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
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    AntechService.prototype.getAntecs = function (antecs, idpass, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from Antech where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertAntecs(antecs, codeClinique);
                }
                else {
                    var an;
                    for (var i = 0; i < result.rows.length; i++) {
                        an = new AntecCh();
                        an.setidpass(result.rows.item(i).idpass);
                        an.setch(result.rows.item(i).ch);
                        _this.antec.push(an);
                    }
                }
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 1 Antech  ' + error);
            });
        });
        return this.antec;
    };
    AntechService.prototype._insertAntecs = function (antecs, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in antecs) {
                if (!antecs.hasOwnProperty(key)) {
                    continue;
                }
                var antec = antecs[key];
                db.executeSql('insert into Antech (idpass ,ch ,codeClinique) values (?,?,?)', [
                    antec.getidpass(),
                    antec.getch(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 Antech ' + error);
        });
    };
    AntechService.prototype.deleteAntecs = function (idpass, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from Antech where  idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //        //alert("Suppression de table Antech est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 Antech  ' + error);
            });
        });
        return this.antec;
    };
    return AntechService;
}());
export { AntechService };
//# sourceMappingURL=AntechService.js.map
