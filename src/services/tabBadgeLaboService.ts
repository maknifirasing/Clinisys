import {SQLite} from 'ionic-native';
import {tabBadge} from "../models/tabBadge";

export class tabBadgeLaboService {
  public tabBadgeLabo: Array<tabBadge> = [];

  constructor() {
  }

  public verifTabBadgeLabo(numDoss, codeClinique) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from tabBadgeLabo where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
          alert('Error 0 tabBadgeLabo  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    });
  }

  public getTabBadgeLabo(tabBadgeLabos: any, numDoss, codeClinique) : Promise<tabBadge> {
    return new Promise<tabBadge>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from tabBadgeLabo where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._inserttabBadgeLabos(tabBadgeLabos)
          } else {
            var t;
            for (var i = 0; i < result.rows.length; i++) {
              t = new tabBadge();
              t.setcodeClinique(result.rows.item(i).codeClinique);
              t.setnumDoss(result.rows.item(i).numDoss);
              t.setFichierT(result.rows.item(i).LabosT);
              t.setFichier(result.rows.item(i).Labos);
              this.tabBadgeLabo.push(t);
            }
            resolve(this.tabBadgeLabo[0]);
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 tabBadgeLabo  ' + error);
        })
    });
    db.close();
    return this;
    });
  }

  private _inserttabBadgeLabos(tabBadgeLabos: Array<tabBadge>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in tabBadgeLabos) {
        if (!tabBadgeLabos.hasOwnProperty(key)) {
          continue;
        }
        let tabBadgeLabo = tabBadgeLabos[key];
        db.executeSql('insert into tabBadgeLabo (codeClinique,numDoss,LabosT,Labos) values (?,?,?,?)', [
          tabBadgeLabo.getcodeClinique(),
          tabBadgeLabo.getnumDoss(),
          tabBadgeLabo.getFichierT(),
          tabBadgeLabo.getFichier()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 tabBadgeLabo ' + error);
    });
    db.close();
  }

  public deletetabBadgeLabos(numDoss, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from tabBadgeLabo where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 tabBadgeLabos  ' + error);
        })
    });
    db.close();
    return this.tabBadgeLabo;
  }
}
