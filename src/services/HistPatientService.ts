import {SQLite} from 'ionic-native';
import {HistPatient} from "../models/HistPatient";

export class HistPatientService {
  public histPatient: Array<HistPatient> = [];
  verif: boolean;

  constructor() {
  }

  public verifHistPatient(user, searchText, etage,codeClinique) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 1) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 HistPatient  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getHistPatients(histPatients: any, user, searchText, etage, codeClinique) {
    this.histPatient.push(histPatients[0]);
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertHistPatients(histPatients);
          } else {
            this.histPatient.pop();
            this.histPatient=[];
            this.histPatient.length=0;
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
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1.1 HistPatient  ' + error);
        })
    });
    db.close();
    return this.histPatient;
  }

  public getHistPatientsOff(histPatients: any, user, searchText, etage, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            return this.histPatient;
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
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1.2 HistPatient  ' + error);
        })
    });
    db.close();
    return this.histPatient;
  }


  private _insertHistPatients(histPatients: Array<HistPatient>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
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
      console.error('Error opening database', error);
      alert('Error 2 HistPatient ' + error);
    });
    db.close();
  }


  public deleteHistPatients(user, searchText, etage,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from HistPatient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "' and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
        //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 HistPatient  ' + error);
        })
    });
    db.close();
    return this.histPatient;
  }
}
