import { SQLite } from 'ionic-native';
import { ListPreanesthesie } from "../models/ListPreanesthesie";
var ListPreanesthesieService = (function () {
    function ListPreanesthesieService() {
        this.listPreanesthesie = [];
    }
    ListPreanesthesieService.prototype.verifListPreanesthesie = function (ListPreanesthesies, numeroDossier, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum  from ListPreanesthesie where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
                    alert('Error 0 listPreanesthesie  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    ListPreanesthesieService.prototype.getListPreanesthesies = function (ListPreanesthesies, numeroDossier, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from ListPreanesthesie where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertListPreanesthesies(ListPreanesthesies, codeClinique);
                }
                else {
                    var lp;
                    for (var i = 0; i < result.rows.length; i++) {
                        lp = new ListPreanesthesie();
                        lp.setacte(result.rows.item(i).acte);
                        lp.setchirurgien(result.rows.item(i).chirurgien);
                        lp.setdateacte(result.rows.item(i).dateacte);
                        lp.setheureDebut(result.rows.item(i).heureDebut);
                        lp.setheureFin(result.rows.item(i).heureFin);
                        lp.setkc(result.rows.item(i).kc);
                        lp.setnumeroDossier(result.rows.item(i).numeroDossier);
                        _this.listPreanesthesie.push(lp);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 listPreanesthesie  ' + error);
            });
        });
        db.close();
        return this.listPreanesthesie;
    };
    ListPreanesthesieService.prototype._insertListPreanesthesies = function (ListPreanesthesies, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in ListPreanesthesies) {
                if (!ListPreanesthesies.hasOwnProperty(key)) {
                    continue;
                }
                var listPreanesthesie = ListPreanesthesies[key];
                db.executeSql('insert into ListPreanesthesie (acte ,chirurgien ,dateacte,heureDebut,heureFin,kc,numeroDossier,codeClinique) values (?,?,?,?,?,?,?,?)', [
                    listPreanesthesie.getacte(),
                    listPreanesthesie.getchirurgien(),
                    listPreanesthesie.getdateacte(),
                    listPreanesthesie.getheureDebut(),
                    listPreanesthesie.getheureFin(),
                    listPreanesthesie.getkc(),
                    listPreanesthesie.getnumeroDossier(),
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 listPreanesthesie ' + error);
        });
        db.close();
    };
    ListPreanesthesieService.prototype.deleteListPreanesthesies = function (numeroDossier, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from ListPreanesthesie where numeroDossier like '" + numeroDossier + "' and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //    alert("Suppression de table Aleg est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 ListPreanesthesie  ' + error);
            });
        });
        db.close();
        return this.listPreanesthesie;
    };
    return ListPreanesthesieService;
}());
export { ListPreanesthesieService };
//# sourceMappingURL=ListPreanesthesieService.js.map