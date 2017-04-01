import { SQLite } from 'ionic-native';
import { SigneCourbe } from "../models/SigneCourbe";
var SigneCourbeTempService = (function () {
    function SigneCourbeTempService() {
        this.signeCourbe = [];
    }
    SigneCourbeTempService.prototype.verifSigneCourbe = function (signeCourbes, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from SigneCourbeTemp where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 SigneCourbeTemp  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    SigneCourbeTempService.prototype.getSigneCourbes = function (signeCourbes, numdoss, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from SigneCourbeTemp where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertSigneCourbes(signeCourbes, numdoss, codeClinique);
                }
                else {
                    var signeCourbe;
                    for (var i = 0; i < result.rows.length; i++) {
                        signeCourbe = new SigneCourbe();
                        signeCourbe.setcodePosologie(result.rows.item(i).codePosologie);
                        signeCourbe.setdesignation(result.rows.item(i).designation);
                        signeCourbe.setseuilMin(result.rows.item(i).seuilMin);
                        signeCourbe.setseuilMax(result.rows.item(i).seuilMax);
                        signeCourbe.setcolor(result.rows.item(i).color);
                        signeCourbe.setunite(result.rows.item(i).unite);
                        signeCourbe.setquantite(result.rows.item(i).quantite);
                        signeCourbe.setheurePrise(result.rows.item(i).heurePrise);
                        signeCourbe.setdateHeurePrise(result.rows.item(i).dateHeurePrise);
                        _this.signeCourbe.push(signeCourbe);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 SigneCourbeTemp  ' + error);
            });
        });
        db.close();
        return this.signeCourbe;
    };
    SigneCourbeTempService.prototype._insertSigneCourbes = function (signeCourbes, numdoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in signeCourbes) {
                if (!signeCourbes.hasOwnProperty(key)) {
                    continue;
                }
                var signeCourbe = signeCourbes[key];
                db.executeSql('insert into SigneCourbeTemp (codePosologie,designation' +
                    ',seuilMin,seuilMax,color,unite,quantite,heurePrise,dateHeurePrise,codeClinique,numdoss) values (?,?,?,?,?,?,?,?,?,?,?)', [
                    signeCourbe.getcodePosologie(),
                    signeCourbe.getdesignation(),
                    signeCourbe.getseuilMin(),
                    signeCourbe.getseuilMax(),
                    signeCourbe.getcolor(),
                    signeCourbe.getunite(),
                    signeCourbe.getquantite(),
                    signeCourbe.getheurePrise(),
                    signeCourbe.getdateHeurePrise(),
                    codeClinique,
                    numdoss
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 SigneCourbeTemp ' + error);
        });
        db.close();
    };
    SigneCourbeTempService.prototype.deleteSigneCourbes = function (numdoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from SigneCourbeTemp where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //    alert("Suppression de table signeCourbe est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 SigneCourbeTemp  ' + error);
            });
        });
        db.close();
        return this.signeCourbe;
    };
    return SigneCourbeTempService;
}());
export { SigneCourbeTempService };
//# sourceMappingURL=SigneCourbeTempService.js.map