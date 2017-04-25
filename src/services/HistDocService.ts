import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {HistDoc} from "../models/HistDoc";

export class HistDocService {
  public histSigneCourbe: Array<HistDoc> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifHistDoc(numDoss, codeClinique, file): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
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

      return this;
    });
  }

  public getHistDocs(histDossiers: any, numDoss, codeClinique, file): Promise<HistDoc> {
    return new Promise<HistDoc>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
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

      return this;
    });
  }

  private _insertHistDocs(histDossiers: Array<HistDoc>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
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

  }


  public deleteHistDocs(numDoss, codeClinique, file) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from HistDoc where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and nom like '" + file + "'", [])
        .then(() => {
          //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 HistDoc  ' + error);
        })
    });

    return this.histSigneCourbe;
  }
}
