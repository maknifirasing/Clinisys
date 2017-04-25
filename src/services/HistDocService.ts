<<<<<<< HEAD
import {SQLite} from 'ionic-native';
=======
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
import {HistDoc} from "../models/HistDoc";

export class HistDocService {
  public histSigneCourbe: Array<HistDoc> = [];

<<<<<<< HEAD
  constructor() {
  }

  public verifHistDoc(numDoss, codeClinique,file): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
=======
  constructor(private sqlite: SQLite)  {
  }

  public verifHistDoc(numDoss, codeClinique, file): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
        db.executeSql("select count(*) as sum from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
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
            alert('Error 0 HistDoc  ' + error);
            resolve(false);
            return false;
          })
      });
<<<<<<< HEAD
      db.close();
=======

>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
      return this;
    });
  }

<<<<<<< HEAD
  public getHistDocs(histDossiers: any, numDoss, codeClinique,file): Promise<HistDoc> {
    return new Promise<HistDoc>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
=======
  public getHistDocs(histDossiers: any, numDoss, codeClinique, file): Promise<HistDoc> {
    return new Promise<HistDoc>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
        db.executeSql("select * from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertHistDocs(histDossiers);
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
            alert('Error 1.1 HistDoc  ' + error);
          })
      });
<<<<<<< HEAD
      db.close();
=======

>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
      return this;
    });
  }

  private _insertHistDocs(histDossiers: Array<HistDoc>): void {
<<<<<<< HEAD
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
=======

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
      for (let key in histDossiers) {
        if (!histDossiers.hasOwnProperty(key)) {
          continue;
        }
        let histDossier = histDossiers[key];
        db.executeSql('insert into HistDoc (numDoss ,date ,codeClinique,nom) values (?,?,?,?)', [
          histDossier.getnumDoss(),
          histDossier.getdate(),
          histDossier.getcodeClinique(),
          histDossier.getnom()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 HistDoc ' + error);
    });
<<<<<<< HEAD
    db.close();
  }


  public deleteHistDocs(numDoss, codeClinique,file) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique  + "'and nom like '" + file + "'", [])
=======

  }


  public deleteHistDocs(numDoss, codeClinique, file) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
        .then(() => {
          //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 HistDoc  ' + error);
        })
    });
<<<<<<< HEAD
    db.close();
=======

>>>>>>> 9c5f10abfd96f15679a024fa49f5abcf1d64585e
    return this.histSigneCourbe;
  }
}
