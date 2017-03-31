import {SQLite} from 'ionic-native';
import {Client} from "../models/Client";

export class ClientService {
  public client: Array<Client> = [];

  constructor() {
  }

  public verifClient(clients: any, numdoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.item(0).sum > 0) {
              resolve(true);
              return true;
            }
            else {
              resolve(false);
              return false;
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 0 Client  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getClients(clients: any, numdoss, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertClients(clients);
          } else {
            var c;
            for (var i = 0; i < result.rows.length; i++) {
              c = new Client();
              c.setadrCli(result.rows.item(i).adrCli);
              c.setdatNai(result.rows.item(i).datNai);
              c.setlibNat(result.rows.item(i).libNat);
              c.setnumTel(result.rows.item(i).numTel)
              c.setetage(result.rows.item(i).etage);
              c.setnumCha(result.rows.item(i).numCha);
              c.setnumdoss(result.rows.item(i).numdoss);
              c.setidentifiant(result.rows.item(i).identifiant);
              c.setcodeClinique(result.rows.item(i).codeClinique);
              c.setdateArr(result.rows.item(i).dateArr);
              this.client.push(c);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 client  ' + error);
        })
    });
    db.close();
    return this.client;
  }

  private _insertClients(clients: Array<Client>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in clients) {
        if (!clients.hasOwnProperty(key)) {
          continue;
        }
        let client = clients[key];
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
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 client ' + error);
    });
    db.close();
  }

  public deleteClients(numdoss, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Client where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          alert("Suppression de table Client est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Client  ' + error);
        })
    });
    db.close();
    return this.client;
  }
}