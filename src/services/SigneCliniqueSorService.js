import { SigneClinique } from "../models/SigneClinique";
var SigneCliniqueSorService = (function () {
    function SigneCliniqueSorService(sqlite) {
        this.sqlite = sqlite;
        this.signeClinique = [];
    }
    SigneCliniqueSorService.prototype.verifSigneClinique = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from SigneCliniqueSor where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
                    + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
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
                     //alert('Error 0 SigneCliniqueSor  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    SigneCliniqueSorService.prototype.getSigneCliniques = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        var _this = this;
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("select * from SigneCliniqueSor where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille
                + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertSigneCliniques(signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique);
                }
                else {
                    var s;
                    for (var i = 0; i < result.rows.length; i++) {
                        s = new SigneClinique();
                        s.setdate(result.rows.item(i).date);
                        s.setdesignation(result.rows.item(i).designation);
                        s.setquantite(result.rows.item(i).quantite);
                        _this.signeClinique.push(s);
                    }
                }
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 1 SigneCliniqueSor  ' + error);
            });
        });
        return this.signeClinique;
    };
    SigneCliniqueSorService.prototype._insertSigneCliniques = function (signeCliniques, numDoss, dateFeuille, nature, codeType, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            for (var key in signeCliniques) {
                if (!signeCliniques.hasOwnProperty(key)) {
                    continue;
                }
                var s = signeCliniques[key];
                db.executeSql('insert into SigneCliniqueSor (date ,designation ,quantite ,numDoss ,dateFeuille, nature ,codetypeof, codeClinique) values (?,?,?,?,?,?,?,?)', [
                    s.getdate(),
                    s.getdesignation(),
                    s.getquantite(),
                    numDoss,
                    dateFeuille,
                    nature,
                    codeType,
                    codeClinique
                ]);
            }
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 SigneCliniqueSor ' + error);
        });
    };
    SigneCliniqueSorService.prototype.deleteSigneCliniques = function (numDoss, dateFeuille, nature, codeType, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from SigneCliniqueSor where numDoss like '" + numDoss + "' and dateFeuille like '" + dateFeuille + "' and nature like '" + nature + "' and codetypeof like '" + codeType + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //     //alert("Suppression de table SigneCliniqueSor est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 SigneCliniqueSor  ' + error);
            });
        });
        return this.signeClinique;
    };
    return SigneCliniqueSorService;
}());
export { SigneCliniqueSorService };
//# sourceMappingURL=SigneCliniqueSorService.js.map
