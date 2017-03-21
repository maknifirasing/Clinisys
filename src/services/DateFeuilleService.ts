import {DateFeuille} from "../models/DateFeuille";
import {SQLite} from "ionic-native";
export class DateFeuilleService {
  date: Array<DateFeuille> = [];

  constructor() {
  }

  public verifDateFeuille(codeClinique):Promise<boolean> {
    return  new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from DateFeuille where codeClinique like '" + codeClinique + "'", []).then(result => {
        if (result.rows.length === 1) {
          resolve(true);
          return true;
        }else {
          resolve(false);
          return false;
        }
      })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 datefeuille  ' + error);
          resolve(false);
          return false;
        })
    });
    db.close();
      return this;
    });
  }

  public getDateFeuille(dates: any,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from DateFeuille where codeClinique like '" + codeClinique + "'", []).then(result => {
        if (result.rows.length === 0) {
          this._insertDateFeuille(dates,codeClinique);
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

  private _insertDateFeuille(dates: Array<DateFeuille>,codeClinique): void {
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
        db.executeSql('insert into DateFeuille (datefeuille ,codeClinique) values (?,?)', [
          date.getdatefeuille(),
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 datefeuille ' + error);
    });
    db.close();
  }

  public deleteDateFeuille(codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from DateFeuille where codeClinique like '" + codeClinique + "'", [])
        .then(() => {
      //    alert("Suppression de table DateFeuille est terminé avec succes");
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
