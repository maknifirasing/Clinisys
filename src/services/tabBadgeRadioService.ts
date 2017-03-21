import {SQLite} from 'ionic-native';
import {tabBadge} from "../models/tabBadge";

export class tabBadgeRadioService {
  public tabBadgeRadio: Array<tabBadge> = [];

  constructor() {
  }

  public verifTabBadgeRadio(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from tabBadgeRadio where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 tabBadgeRadio  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getTabBadgeRadio(tabBadgeRadios: any, numDoss, codeClinique): Promise<tabBadge> {
    return new Promise<tabBadge>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select * from tabBadgeRadio where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._inserttabBadgeRadios(tabBadgeRadios)
            } else {
              var t;
              for (var i = 0; i < result.rows.length; i++) {
                t = new tabBadge();
                t.setnumDoss(result.rows.item(i).numDoss);
                t.setFichierT(result.rows.item(i).RadioT);
                t.setFichier(result.rows.item(i).Radio);
                this.tabBadgeRadio.push(t);
              }
              resolve(this.tabBadgeRadio[0]);
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1 tabBadgeRadio  ' + error);
          })
      });
      db.close();
      return this;
    });
  }

  private _inserttabBadgeRadios(tabBadgeRadios: Array<tabBadge>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in tabBadgeRadios) {
        if (!tabBadgeRadios.hasOwnProperty(key)) {
          continue;
        }
        let tabBadgeRadio = tabBadgeRadios[key];
        db.executeSql('insert into tabBadgeRadio (codeClinique,numDoss,RadioT,Radio) values (?,?,?,?)', [
          tabBadgeRadio.getcodeClinique(),
          tabBadgeRadio.getnumDoss(),
          tabBadgeRadio.getFichierT(),
          tabBadgeRadio.getFichier()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 tabBadgeRadio ' + error);
    });
    db.close();
  }

  public deletetabBadgeRadios(numDoss, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from tabBadgeRadio where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 tabBadgeRadio  ' + error);
        })
    });
    db.close();
    return this.tabBadgeRadio;
  }
}
