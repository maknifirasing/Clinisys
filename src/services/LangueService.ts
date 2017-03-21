import {SQLite} from 'ionic-native';
import {Langue} from "../models/Langue";


export class LangueService {
  public langue: Array<Langue> = [];

  constructor() {
  }

  public verifLangue() : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from Langue ", [])
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
          alert('Error 0 Langue  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    })
  }

  public getLangues(langues: any): Promise<Langue> {
    return new Promise<Langue>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Langue ", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertLangues(langues);
            resolve(langues[0]);
          } else {
            var l;
            for (var i = 0; i < result.rows.length; i++) {
              l = new Langue();
              l.setlangue(result.rows.item(i).langue);
              this.langue.push(l);
            }
            resolve(this.langue[0]);
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Langue  ' + error);
        })
    });
      db.close();
      return this;
    });
  }

  private _insertLangues(langues: Array<Langue>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in langues) {
        if (!langues.hasOwnProperty(key)) {
          continue;
        }
        let langue = langues[key];
        db.executeSql('insert into Langue (langue) values (?)', [
          langue.getlangue()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Langue ' + error);
    });
    db.close();
  }

  public deleteLangues() {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Langue ", [])
        .then(() => {
      //    alert("Suppression de table Aleg est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Langue  ' + error);
        })
    });
    db.close();
    return this.langue;
  }
}
