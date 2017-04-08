import {SQLite} from 'ionic-native';
import {Clinique} from "../models/Clinique";

export class CliniqueService {
  public clinique: Array<Clinique> = [];

  constructor() {
  }

  public verifClinique(cliniques: any): Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from Clinique ", [])
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
          alert('Error 0 Clinique  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    })
  }

  public getCliniques(cliniques: any) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Clinique ", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertCliniques(cliniques);
          } else {
            var c;
            for (var i = 0; i < result.rows.length; i++) {
              c = new Clinique();
              c.setcode(result.rows.item(i).code);
              c.setnom(result.rows.item(i).nom);
              this.clinique.push(c);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Clinique  ' + error);
        })
    });
    db.close();
    return this.clinique;
  }

  private _insertCliniques(cliniques: Array<Clinique>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in cliniques) {
        if (!cliniques.hasOwnProperty(key)) {
          continue;
        }
        let clinique = cliniques[key];
        db.executeSql('insert into Clinique (code,nom) values (?,?)', [
          clinique.getcode(),
          clinique.getnom()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Clinique ' + error);
    });
    db.close();
  }

  public deleteCliniques() {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Clinique ", [])
        .then(() => {
      //    alert("Suppression de table Aleg est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Clinique  ' + error);
        })
    });
    db.close();
    return this.clinique;
  }
}
