import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Langue} from "../models/Langue";


export class LangueService {
  public langue: Array<Langue> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifLangue(): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from Langue ", [])
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
            alert('Error 0 Langue  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    })
  }

  public getLangues(langues: any): Promise<Langue> {
    return new Promise<Langue>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from Langue ", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertLangues(langues);
              resolve(langues[0]);
            } else {
              var l;
              for (var i = 0; i < result.rows.length; i++) {
                l = new Langue();
                l.setlangue(result.rows.item(i).langue);
                l.setnom(result.rows.item(i).nom);
                l.setcodePin(result.rows.item(i).codePin);
                l.setcodeClinique(result.rows.item(i).codeClinique);
                l.setnomClinique(result.rows.item(i).nomClinique);
                l.seturl(result.rows.item(i).url);
                this.langue.push(l);
              }
              resolve(this.langue[0]);
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1 Langue  ' + error);
          })
      });

      return this;
    });
  }

  private _insertLangues(langues: Array<Langue>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in langues) {
        if (!langues.hasOwnProperty(key)) {
          continue;
        }
        let langue = langues[key];
        db.executeSql('insert into Langue (langue,nom,codePin,codeClinique,nomClinique,url) values (?,?,?,?,?,?)', [
          langue.getlangue(),
          langue.getnom(),
          langue.getcodePin(),
          langue.getcodeClinique(),
          langue.getnomClinique(),
          langue.geturl()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Langue ' + error);
    });

  }

  public deleteLangues(): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("delete from Langue ", [])
          .then(() => {
            //   alert("Suppression de table Aleg est terminé avec succes");
            resolve(true);
            return true;
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 3 Langue  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }
}
