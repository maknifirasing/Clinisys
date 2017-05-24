import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {HistPatient} from "../models/HistPatient";

export class HistPatientService {
  public histPatient: Array<HistPatient> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifHistPatient(user, searchText, etage, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
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
            //console.error('Error opening database', error);
             //alert('Error 0 HistPatient  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getHistPatients(histPatients: any, user, searchText, etage, codeClinique): Promise<HistPatient> {
    return new Promise<HistPatient>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertHistPatients(histPatients);
              resolve(histPatients[0]);
            } else {
              var p;
              for (var i = 0; i < result.rows.length; i++) {
                p = new HistPatient();
                p.setuser(result.rows.item(i).user);
                p.setsearchText(result.rows.item(i).searchText);
                p.setetage(result.rows.item(i).etage);
                p.setdate(result.rows.item(i).date);
                p.setcodeClinique(result.rows.item(i).codeClinique);
                this.histPatient.push(p);
              }
              resolve(this.histPatient[0]);
            }
          })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 1.1 HistPatient  ' + error);
          })
      });

      return this;
    });
  }

  private _insertHistPatients(histPatients: Array<HistPatient>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in histPatients) {
        if (!histPatients.hasOwnProperty(key)) {
          continue;
        }
        let histPatient = histPatients[key];
        db.executeSql('insert into HistPatient (user ,searchText ,etage ,date ,codeClinique) values (?,?,?,?,?)', [
          histPatient.getuser(),
          histPatient.getsearchText(),
          histPatient.getetage(),
          histPatient.getdate(),
          histPatient.getcodeClinique()
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 HistPatient ' + error);
    });

  }


  public deleteHistPatients(user, searchText, etage, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   //alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 HistPatient  ' + error);
        })
    });

    return this.histPatient;
  }
}
