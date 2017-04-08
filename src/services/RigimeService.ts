import {SQLite} from 'ionic-native';
import {Rigime} from "../models/Rigime";

export class RigimeService {
  public rigime: Array<Rigime> = [];

  constructor() {
  }

  public verifRigime(rigimes: any, numdoss, datefeuille, nature,codeClinique) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from Rigime where numdoss like '" + numdoss + "' and datefeuille like '" + datefeuille + "' and nature like '" + nature + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.item(0).sum >0) {
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
          alert('Error 0 Rigime  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    });
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
        db.executeSql('insert into Rigime (designation ,numdoss ' +
          ',datefeuille, nature,codeClinique) values (?,?,?,?,?)', [
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
