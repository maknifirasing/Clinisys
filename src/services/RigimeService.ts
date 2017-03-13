import {SQLite} from 'ionic-native';
import {Rigime} from "../models/Rigime";

export class RigimeService {
  public rigime = new Rigime();
  verif: boolean;

  constructor() {
  }

  public verifRigime(rigimes: any, numdoss, datefeuille, nature) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'", [])
        .then(result => {
          if (result.rows.length === rigimes.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 Rigime  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getRigimes(rigimes, numdoss, datefeuille, nature) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertRigimes(rigimes, numdoss, datefeuille, nature);
          } else {
            this.rigime.setcodeRegime(result.rows.item(0).codeRegime);
            this.rigime.setdesignation(result.rows.item(0).designation);

          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Rigime  ' + error);
        })
    });
    db.close();
    return this.rigime;
  }

  private _insertRigimes(rigime, numdoss, datefeuille, nature): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('insert into Rigime (codeRegime, designation ,numdoss ' +
        ',datefeuille, nature) values (?,?,?,?,?)', [
        rigime.getcodeRegime(),
        rigime.getdesignation(),
        numdoss,
        datefeuille,
        nature
      ]);
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Rigime ' + error);
    });
    db.close();
  }


  public deleteRigimes(numdoss, datefeuille, nature) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'", [])
        .then(() => {
          //      alert("Suppression de table Rigime est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Rigime  ' + error);
        })
    });
    db.close();
    return this.rigime;
  }
}
