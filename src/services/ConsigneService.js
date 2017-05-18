import { Consigne } from "../models/Consigne";
var ConsigneService = (function () {
    function ConsigneService(sqlite) {
        this.sqlite = sqlite;
        this.consigne = [];
    }
    ConsigneService.prototype.verifConsigne = function (consignes, numeroDossier, codeClinique, typeget, etatget) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
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
                     //alert('Error 0 Consigne  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    ConsigneService.prototype.getConsignes = function (consignes, numeroDossier, codeClinique, typeget, etatget) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertConsignes(consignes, typeget, etatget);
                }
                else {
                    var consigne;
                    for (var i = 0; i < result.rows.length; i++) {
                        consigne = new Consigne();
                        consigne.setdatetache(result.rows.item(i).datetache);
                        consigne.setdetails(result.rows.item(i).details);
                        consigne.setetat(result.rows.item(i).etat);
                        consigne.setheurtache(result.rows.item(i).heurtache);
                        consigne.setnumeroDossier(result.rows.item(i).numeroDossier);
                        consigne.setcodeMedecin(result.rows.item(i).codeMedecin);
                        consigne.settype(result.rows.item(i).type);
                        consigne.setuserCreate(result.rows.item(i).userCreate);
                        _this.consigne.push(consigne);
                    }
                }
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 1 Consigne  ' + error);
            });
        });
        return this.consigne;
    };
    ConsigneService.prototype._insertConsignes = function (consignes, typeget, etatget) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in consignes) {
                if (!consignes.hasOwnProperty(key)) {
                    continue;
                }
                var consigne = consignes[key];
                db.executeSql('insert into Consigne (datetache ,details ,etat ,heurtache,numeroDossier,codeMedecin ,type ,userCreate ,codeClinique,typeget ,etatget) values (?,?,?,?,?,?,?,?,?,?,?)', [
                    consigne.getdatetache(),
                    consigne.getdetails(),
                    consigne.getetat(),
                    consigne.getheurtache(),
                    consigne.getnumeroDossier(),
                    consigne.getcodeMedecin(),
                    consigne.gettype(),
                    consigne.getuserCreate(),
                    consigne.getcodeClinique(),
                    typeget,
                    etatget
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 Consigne ' + error);
        });
    };
    ConsigneService.prototype.deleteConsignes = function (numeroDossier, codeClinique, typeget, etatget) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("delete from Consigne where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'and typeget like '" + typeget + "'and etatget like '" + etatget + "'", [])
                    .then(function () {
                    resolve(true);
                    return true;
                })
                    .catch(function (error) {
                    //console.error('Error opening database', error);
                     //alert('Error 3 Consigne  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this.consigne;
        });
    };
    return ConsigneService;
}());
export { ConsigneService };
//# sourceMappingURL=ConsigneService.js.map
