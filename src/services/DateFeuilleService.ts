import {DateFeuille} from "../models/DateFeuille";
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
export class DateFeuilleService {

  date: Array<DateFeuille> = [];
  
  constructor(private sqlite: SQLite)  {
  }

  public verifDateFeuille(codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from DateFeuille where codeClinique like '" + codeClinique + "'", []).then(result => {
          if (result.rows.item(0).sum > 0) {
            resolve(true);
            return true;
          } else {
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

      return this;
    });
  }

  public getDateFeuille(dates: any, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("select * from DateFeuille where codeClinique like '" + codeClinique + "'", []).then(result => {
        if (result.rows.length === 0) {
          this._insertDateFeuille(dates, codeClinique);
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

    return this.date;
  }

  private _insertDateFeuille(dates: Array<DateFeuille>, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
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

  }

  public deleteDateFeuille(codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from DateFeuille where codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //    alert("Suppression de table DateFeuille est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 DateFeuille  ' + error);
        })
    });

    return this.date;
  }
}
