import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {HistDossier} from "../models/HistDossier";

export class HistTraitCourbeService {
  public histSigneCourbe: Array<HistDossier> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifHistTraitCourbe(numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from HistTraitCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
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
             //alert('Error 0 HistTraitCourbe  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getHistTraitCourbes(histDossiers: any, numDoss, codeClinique): Promise<HistDossier> {
    return new Promise<HistDossier>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from HistTraitCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertHistTraitCourbes(histDossiers);
              resolve(histDossiers[0]);
            } else {
              this.histSigneCourbe.pop();
              this.histSigneCourbe = [];
              this.histSigneCourbe.length = 0;
              var d;
              for (var i = 0; i < result.rows.length; i++) {
                d = new HistDossier();
                d.setnumDoss(result.rows.item(i).numDoss);
                d.setdate(result.rows.item(i).date);
                d.setcodeClinique(result.rows.item(i).codeClinique);
                this.histSigneCourbe.push(d);
              }
              resolve(this.histSigneCourbe[0]);
            }
          })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 1.1 HistTraitCourbe  ' + error);
          })
      });

      return this;
    });
  }

  private _insertHistTraitCourbes(histDossiers: Array<HistDossier>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in histDossiers) {
        if (!histDossiers.hasOwnProperty(key)) {
          continue;
        }
        let histDossier = histDossiers[key];
        db.executeSql('insert into HistTraitCourbe (numDoss ,date ,codeClinique) values (?,?,?)', [
          histDossier.getnumDoss(),
          histDossier.getdate(),
          histDossier.getcodeClinique()
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 HistTraitCourbe ' + error);
    });

  }


  public deleteHistTraitCourbes(numDoss, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from HistTraitCourbe where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   //alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 HistTraitCourbe  ' + error);
        })
    });

    return this.histSigneCourbe;
  }
}
