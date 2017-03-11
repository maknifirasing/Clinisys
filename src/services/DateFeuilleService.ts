import {DateFeuille} from "../models/DateFeuille";
import {SQLite} from "ionic-native";
export class DateFeuilleService {
  date: Array<DateFeuille> = [];
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
          this._insertDateFeuille(dates);
        } else {
          var d;
          for (var i = 0; i < result.rows.length; i++) {
            d = new DateFeuille();
            d.setdatefeuille(result.rows.item(i).datefeuille);
            this.date.push(d);
          }
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

  private _insertDateFeuille(dates: Array<DateFeuille>,): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in dates) {
        if (!dates.hasOwnProperty(key)) {
          continue;
        }
        let date = dates[key];
        db.executeSql('insert into DateFeuille (datefeuille) values (?)', [
          date.getdatefeuille()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 datefeuille ' + error);
    });
    db.close();
  }

  public deleteDateFeuille() {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from DateFeuille", [])
        .then(() => {
          alert("Suppression de table DateFeuille est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 DateFeuille  ' + error);
        })
    });
    db.close();
    return this.date;
  }
}
