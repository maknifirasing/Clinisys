import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Clinique} from "../models/Clinique";

export class CliniqueService {
  public clinique: Array<Clinique> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifClinique(cliniques: any): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from Clinique ", [])
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
             //alert('Error 0 Clinique  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    })
  }

  public getCliniques(cliniques: any): Promise<Clinique[]> {
    return new Promise<Clinique[]>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from Clinique ", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertCliniques(cliniques);
            } else {
              var c;
              for (var i = 0; i < result.rows.length; i++) {
                c = new Clinique();
                c.setcode(result.rows.item(i).code);
                c.setnom(result.rows.item(i).nom);
                c.seturl(result.rows.item(i).url);
                this.clinique.push(c);
              }
              resolve(this.clinique);
            }
          })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 1 Clinique  ' + error);
          })
      });

      return this;
    });
  }

  private _insertCliniques(cliniques: Array<Clinique>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in cliniques) {
        if (!cliniques.hasOwnProperty(key)) {
          continue;
        }
        let clinique = cliniques[key];
        db.executeSql('insert into Clinique (code,nom,url) values (?,?,?)', [
          clinique.getcode(),
          clinique.getnom(),
          clinique.geturl()
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 Clinique ' + error);
    });

  }

  public deleteCliniques() {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from Clinique ", [])
        .then(() => {
          //     //alert("Suppression de table Aleg est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 Clinique  ' + error);
        })
    });

    return this.clinique;
  }
}
