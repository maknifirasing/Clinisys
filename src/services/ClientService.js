import { SQLite } from 'ionic-native';
import { Client } from "../models/Client";
var ClientService = (function () {
    function ClientService() {
        this.client = [];
    }
    ClientService.prototype.verifClient = function (clients, numdoss, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
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
                    console.error('Error opening database', error);
                    alert('Error 0 Client  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    ClientService.prototype.getClients = function (clients, numdoss, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function (result) {
                if (result.rows.length === 0) {
                    _this._insertClients(clients);
                }
                else {
                    var c;
                    for (var i = 0; i < result.rows.length; i++) {
                        c = new Client();
                        c.setadrCli(result.rows.item(i).adrCli);
                        c.setdatNai(result.rows.item(i).datNai);
                        c.setlibNat(result.rows.item(i).libNat);
                        c.setnumTel(result.rows.item(i).numTel);
                        c.setetage(result.rows.item(i).etage);
                        c.setnumCha(result.rows.item(i).numCha);
                        c.setnumdoss(result.rows.item(i).numdoss);
                        c.setidentifiant(result.rows.item(i).identifiant);
                        c.setcodeClinique(result.rows.item(i).codeClinique);
                        c.setdateArr(result.rows.item(i).dateArr);
                        _this.client.push(c);
                    }
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 client  ' + error);
            });
        });
        db.close();
        return this.client;
    };
    ClientService.prototype._insertClients = function (clients) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in clients) {
                if (!clients.hasOwnProperty(key)) {
                    continue;
                }
                var client = clients[key];
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
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 client ' + error);
        });
        db.close();
    };
    ClientService.prototype.deleteClients = function (numdoss, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                alert("Suppression de table Client est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 Client  ' + error);
            });
        });
        db.close();
        return this.client;
    };
    return ClientService;
}());
export { ClientService };
//# sourceMappingURL=ClientService.js.map