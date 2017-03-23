import { SQLite } from 'ionic-native';
import { AntecCh } from "../models/AntecCh";
var AlegchService = (function () {
    function AlegchService() {
        this.aleg = [];
    }
    AlegchService.prototype.verifAleg = function (alegs, idpass, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from Alegc where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 Alegc  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    AlegchService.prototype.getAlegs = function (alegs, idpass, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Alegc where idpass like '" + idpass + "' and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertAlegs(alegs, codeClinique);
                }
                else {
                    var an;
                    for (var i = 0; i < result.rows.length; i++) {
                        an = new AntecCh();
                        an.setidpass(result.rows.item(i).idpass);
                        an.setch(result.rows.item(i).ch);
                        _this.aleg.push(an);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Alegc  ' + error);
            });
        });
        db.close();
        return this.aleg;
    };
    AlegchService.prototype._insertAlegs = function (alegs, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in alegs) {
                if (!alegs.hasOwnProperty(key)) {
                    continue;
                }
                var antec = alegs[key];
                db.executeSql('insert into Alegc (idpass ,ch ,codeClinique) values (?,?,?)', [
                    antec.getidpass(),
                    antec.getch(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Alegc ' + error);
        });
        db.close();
    };
    AlegchService.prototype.deleteAlegs = function (idpass, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Alegc where  idpass like '" + idpass + "' and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //    alert("Suppression de table Aleg est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Alegc  ' + error);
            });
        });
        db.close();
        return this.aleg;
    };
    return AlegchService;
}());
export { AlegchService };
//# sourceMappingURL=AlegchService.js.map