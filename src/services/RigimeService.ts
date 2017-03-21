import {SQLite} from 'ionic-native';
import {Rigime} from "../models/Rigime";

export class RigimeService {
  public rigime: Array<Rigime> = [];
  verif: boolean;

  constructor() {
  }

  public verifRigime(rigimes: any, numdoss, datefeuille, nature,codeClinique) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
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

  public getRigimes(rigimes, numdoss, datefeuille, nature,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertRigimes(rigimes, numdoss, datefeuille, nature,codeClinique);
          } else {
            var r;
            for (var i = 0; i < result.rows.length; i++) {
              r = new Rigime();
              r.setcodeRegime(result.rows.item(0).codeRegime);
              r.setdesignation(result.rows.item(0).designation);
              this.rigime.push(r);
            }
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

  private _insertRigimes(rigimes, numdoss, datefeuille, nature,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in rigimes) {
        if (!rigimes.hasOwnProperty(key)) {
          continue;
        }
        let rigime = rigimes[key];
        db.executeSql('insert into Rigime (codeRegime, designation ,numdoss ' +
          ',datefeuille, nature,codeClinique) values (?,?,?,?,?,?)', [
          rigime.getcodeRegime(),
          rigime.getdesignation(),
          numdoss,
          datefeuille,
          nature,
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Rigime ' + error);
    });
    db.close();
  }


  public deleteRigimes(numdoss, datefeuille, nature,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
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
