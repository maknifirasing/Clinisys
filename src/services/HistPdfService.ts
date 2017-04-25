<<<<<<< HEAD
import {SQLite} from 'ionic-native';
=======
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
import {HistDoc} from "../models/HistDoc";

export class HistPdfService {
  public histSigneCourbe: Array<HistDoc> = [];

  constructor(private sqlite: SQLite) {
  }

<<<<<<< HEAD
  public verifHistPdf(numDoss, codeClinique,file): Promise<boolean> {
=======
  public verifHistPdf(numDoss, codeClinique, file): Promise<boolean> {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
<<<<<<< HEAD
      }).then(() => {
=======
      }).then((db: SQLiteObject) => {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
        db.executeSql("select count(*) as sum from HistPdf where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
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
            alert('Error 0 HistPdf  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

<<<<<<< HEAD
  public getHistPdfs(histDossiers: any, numDoss, codeClinique,file): Promise<HistDoc> {
    return new Promise<HistDoc>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
=======
  public getHistPdfs(histDossiers: any, numDoss, codeClinique, file): Promise<HistDoc> {
    return new Promise<HistDoc>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
        db.executeSql("select * from HistPdf where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertHistPdfs(histDossiers);
              resolve(histDossiers[0]);
            } else {
              this.histSigneCourbe.pop();
              this.histSigneCourbe = [];
              this.histSigneCourbe.length = 0;
              var d;
              for (var i = 0; i < result.rows.length; i++) {
                d = new HistDoc();
                d.setnumDoss(result.rows.item(i).numDoss);
                d.setdate(result.rows.item(i).date);
                d.setcodeClinique(result.rows.item(i).codeClinique);
                d.setnom(result.rows.item(i).nom);
                this.histSigneCourbe.push(d);
              }
              resolve(this.histSigneCourbe[0]);
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1.1 HistPdf  ' + error);
          })
      });

      return this;
    });
  }

  private _insertHistPdfs(histDossiers: Array<HistDoc>): void {
<<<<<<< HEAD
    let db = new SQLite();
    db.openDatabase({
=======

    this.sqlite.create({
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in histDossiers) {
        if (!histDossiers.hasOwnProperty(key)) {
          continue;
        }
        let histDossier = histDossiers[key];
        db.executeSql('insert into HistPdf (numDoss ,date ,codeClinique,nom) values (?,?,?,?)', [
          histDossier.getnumDoss(),
          histDossier.getdate(),
          histDossier.getcodeClinique(),
          histDossier.getnom()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 HistPdf ' + error);
    });

  }


<<<<<<< HEAD
  public deleteHistPdfs(numDoss, codeClinique,file) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from HistPdf where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique  + "'and nom like '" + file + "'", [])
=======
  public deleteHistPdfs(numDoss, codeClinique, file) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from HistPdf where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
        .then(() => {
          //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 HistPdf  ' + error);
        })
    });

    return this.histSigneCourbe;
  }
}
