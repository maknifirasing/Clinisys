import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {HistDossier} from "../models/HistDossier";

export class HistDossierService {
  histDossier: any;

  constructor(private sqlite: SQLite)  {
  }

  public verifHistDossier(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
<<<<<<< HEAD
      }).then(() => {
=======
      }).then((db: SQLiteObject) => {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
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

      return this;
    });
  }

  public getHistDossiers(histDossiers, numDoss, codeClinique): Promise<HistDossier> {
    return new Promise<HistDossier>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
<<<<<<< HEAD
      }).then(() => {
=======
      }).then((db: SQLiteObject) => {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
        db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertHistPatients(histDossiers);
              resolve(histDossiers);
            } else {
              this.histDossier = new HistDossier();
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

      return this;
    });
  }

  private _insertHistPatients(histDossier): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {

      db.executeSql('insert into HistDossier (numDoss ,date ,codeClinique) values (?,?,?)', [
        histDossier.getnumDoss(),
        histDossier.getdate(),
        histDossier.getcodeClinique()
      ]);

    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 HistDossier ' + error);
    });

  }


<<<<<<< HEAD
  public deleteHistDossiers(numDoss, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 HistDossier  ' + error);
        })
=======
  public deleteHistDossiers(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
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

      return this;
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
    });
  }
}
