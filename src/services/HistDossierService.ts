import {SQLite} from 'ionic-native';
import {HistDossier} from "../models/HistDossier";

export class HistDossierService {
  histDossier:any;

  constructor() {
  }

  public verifHistDossier(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 HistDossier  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getHistDossiers(histDossiers, numDoss, codeClinique): Promise<HistDossier> {
    return new Promise<HistDossier>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertHistPatients(histDossiers);
              resolve(histDossiers);
            } else {
              this.histDossier=new HistDossier();
              this.histDossier.setnumDoss(result.rows.item(0).numDoss);
              this.histDossier.setdate(result.rows.item(0).date);
              this.histDossier.setcodeClinique(result.rows.item(0).codeClinique);
              resolve(this.histDossier);
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1.1 HistDossier  ' + error);
          })
      });
      db.close();
      return this;
    });
  }

  private _insertHistPatients(histDossier): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {

        db.executeSql('insert into HistDossier (numDoss ,date ,codeClinique) values (?,?,?)', [
          histDossier.getnumDoss(),
          histDossier.getdate(),
          histDossier.getcodeClinique()
        ]);

    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 HistDossier ' + error);
    });
    db.close();
  }


  public deleteHistDossiers(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("delete from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
          .then(() => {
      //      alert("Suppression de table HistDossier est terminé avec succes");
            resolve(true);
            return true;
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 3 HistDossier  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }
}
