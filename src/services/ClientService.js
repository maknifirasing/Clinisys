import { Client } from "../models/Client";
var ClientService = (function () {
    function ClientService(sqlite) {
        this.sqlite = sqlite;
    }
    ClientService.prototype.verifClient = function (clients, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select count(*) as sum from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
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
                     //alert('Error 0 Client  ' + error);
                    resolve(false);
                    return false;
                });
            });
            return _this;
        });
    };
    ClientService.prototype.getClients = function (clients, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.sqlite.create({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function (db) {
                db.executeSql("select * from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                    .then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertClients(clients);
                    }
                    else {
                        var c;
                        //       for (var i = 0; i < result.rows.length; i++) {
                        c = new Client();
                        c.setadrCli(result.rows.item(0).adrCli);
                        c.setdatNai(result.rows.item(0).datNai);
                        c.setlibNat(result.rows.item(0).libNat);
                        c.setnumTel(result.rows.item(0).numTel);
                        c.setetage(result.rows.item(0).etage);
                        c.setnumCha(result.rows.item(0).numCha);
                        c.setnumdoss(result.rows.item(0).numdoss);
                        c.setidentifiant(result.rows.item(0).identifiant);
                        c.setcodeClinique(result.rows.item(0).codeClinique);
                        c.setdateArr(result.rows.item(0).dateArr);
                        resolve(c);
                        return c;
                        //     }
                    }
                })
                    .catch(function (error) {
                    //console.error('Error opening database', error);
                     //alert('Error 1 client  ' + error);
                });
            });
            return _this;
        });
    };
    ClientService.prototype._insertClients = function (client) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql('insert into Client (adrCli,datNai,libNat' +
                ',numTel,etage,numCha,numdoss,identifiant,codeClinique,dateArr) values (?,?,?,?,?,?,?,?,?,?)', [
                client.getadrCli(),
                client.getdatNai(),
                client.getlibNat(),
                client.getnumTel(),
                client.getetage(),
                client.getnumCha(),
                client.getnumdoss(),
                client.getidentifiant(),
                client.getcodeClinique(),
                client.getdateArr()
            ]);
        }).catch(function (error) {
            //console.error('Error opening database', error);
             //alert('Error 2 client ' + error);
        });
    };
    ClientService.prototype.deleteClients = function (numdoss, codeClinique) {
        this.sqlite.create({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function (db) {
            db.executeSql("delete from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                 //alert("Suppression de table Client est terminé avec succes");
            })
                .catch(function (error) {
                //console.error('Error opening database', error);
                 //alert('Error 3 Client  ' + error);
            });
        });
        return this.client;
    };
    return ClientService;
}());
export { ClientService };
//# sourceMappingURL=ClientService.js.map
