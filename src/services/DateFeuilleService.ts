import {DateFeuille} from "../models/DateFeuille";
import {SQLite} from "ionic-native";
export class DateFeuilleService {
  public date: DateFeuille;
  verif: boolean;

  constructor() {
  }

  public verifDateFeuille() {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('select * from DateFeuille', []).then(result => {
        if (result.rows.length === 0) {
          this.verif = true;
        }
      })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 datefeuille  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getDateFeuille(dates: any) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('select * from DateFeuille', []).then(result => {
        if (result.rows.length === 0) {
          this._insertDateFeuille(dates)
        } else {
          this.date = new DateFeuille();
          this.date.setdatefeuille(result.rows.item(0).datefeuille);
        }
      })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 datefeuille  ' + error);
        })
    });
    db.close();
    return this.date;
  }

  private _insertDateFeuille(dates): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('insert into DateFeuille (datefeuille) values (?)', [
        dates.getdatefeuille()
      ]);
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 datefeuille ' + error);
    });
    db.close();
  }
}
