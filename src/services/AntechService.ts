import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {AntecCh} from "../models/AntecCh";

export class AntechService {
  public antec: Array<AntecCh> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifAntec(antecs: any, idpass, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from Antech where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
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
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getAntecs(antecs: any, idpass, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("select * from Antech where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertAntecs(antecs, codeClinique);
          } else {
            var an;
            for (var i = 0; i < result.rows.length; i++) {
              an = new AntecCh();
              an.setidpass(result.rows.item(i).idpass);
              an.setch(result.rows.item(i).ch);
              this.antec.push(an);
            }
          }
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 1 Antech  ' + error);
        })
    });

    return this.antec;
  }

  private _insertAntecs(antecs: Array<AntecCh>, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in antecs) {
        if (!antecs.hasOwnProperty(key)) {
          continue;
        }
        let antec = antecs[key];
        db.executeSql('insert into Antech (idpass ,ch ,codeClinique) values (?,?,?)', [
          antec.getidpass(),
          antec.getch(),
          codeClinique
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 Antech ' + error);
    });

  }

  public deleteAntecs(idpass, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from Antech where  idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //        //alert("Suppression de table Antech est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 Antech  ' + error);
        })
    });

    return this.antec;
  }
}
