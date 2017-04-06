import { SQLite } from 'ionic-native';
import { Consigne } from "../models/Consigne";
var ConsigneService = (function () {
    function ConsigneService() {
        this.consigne = [];
    }
    ConsigneService.prototype.verifConsigne = function (consignes, numeroDossier, codeClinique, typeget, etatget) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
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
                    alert('Error 0 Consigne  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    ConsigneService.prototype.getConsignes = function (consignes, numeroDossier, codeClinique, typeget, etatget) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertConsignes(consignes);
                }
                else {
                    var consigne;
                    for (var i = 0; i < result.rows.length; i++) {
                        consigne = new Consigne();
                        consigne.getcodeExamen(result.rows.item(i).codeExamen);
                        consigne.setcodeMedecin(result.rows.item(i).codeMedecin);
                        consigne.setcodeinf(result.rows.item(i).codeinf);
                        consigne.setdate(result.rows.item(i).date);
                        consigne.setdateDelete(result.rows.item(i).dateDelete);
                        consigne.setdateRealisation(result.rows.item(i).dateRealisation);
                        consigne.setdatetache(result.rows.item(i).datetache);
                        consigne.setdetails(result.rows.item(i).details);
                        consigne.setetat(result.rows.item(i).etat);
                        consigne.setheurtache(result.rows.item(i).heurtache);
                        consigne.setid(result.rows.item(i).id);
                        consigne.setlistCode(result.rows.item(i).listCode);
                        consigne.setnomMed(result.rows.item(i).nomMed);
                        consigne.setnumeroDossier(result.rows.item(i).numeroDossier);
                        consigne.setobservation(result.rows.item(i).observation);
                        consigne.settype(result.rows.item(i).type);
                        consigne.setuserCreate(result.rows.item(i).userCreate);
                        consigne.setuserDelete(result.rows.item(i).userDelete);
                        consigne.setuserRealise(result.rows.item(i).userRealise);
                        consigne.setcodeClinique(result.rows.item(i).codeClinique);
                        consigne.settypeget(result.rows.item(i).typeget);
                        consigne.setetatget(result.rows.item(i).etatget);
                        _this.consigne.push(consigne);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Consigne  ' + error);
            });
        });
        db.close();
        return this.consigne;
    };
    ConsigneService.prototype._insertConsignes = function (consignes) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in consignes) {
                if (!consignes.hasOwnProperty(key)) {
                    continue;
                }
                var consigne = consignes[key];
                db.executeSql('insert into Consigne (codeExamen ,codeMedecin ,codeinf ,date ,dateDelete ,dateRealisation ,' +
                    'datetache ,details ,etat ,heurtache ,id ,listCode ,nomMed ,numeroDossier ,observation ,type ,userCreate ,userDelete ,userRealise ,codeClinique ,typeget ,etatget) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                    consigne.getcodeExamen(),
                    consigne.getcodeMedecin(),
                    consigne.getcodeinf(),
                    consigne.getdate(),
                    consigne.getdateDelete(),
                    consigne.getdateRealisation(),
                    consigne.getdatetache(),
                    consigne.getdetails(),
                    consigne.getetat(),
                    consigne.getheurtache(),
                    consigne.getid(),
                    consigne.getlistCode(),
                    consigne.getnomMed(),
                    consigne.getnumeroDossier(),
                    consigne.getobservation(),
                    consigne.gettype(),
                    consigne.getuserCreate(),
                    consigne.getuserDelete(),
                    consigne.getuserRealise(),
                    consigne.getcodeClinique(),
                    consigne.gettypeget(),
                    consigne.getetatget()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Consigne ' + error);
        });
        db.close();
    };
    ConsigneService.prototype.deleteConsignes = function (numeroDossier, codeClinique, typeget, etatget) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
                .then(function () {
                //   alert("Suppression de table Traitement est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Consigne  ' + error);
            });
        });
        db.close();
        return this.consigne;
    };
    return ConsigneService;
}());
export { ConsigneService };
//# sourceMappingURL=ConsigneService.js.map