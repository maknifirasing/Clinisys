import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {AntecCh} from "../models/AntecCh";

export class AlegchService {
  public aleg: Array<AntecCh> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifAleg(alegs: any, idpass, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from Alegc where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
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
             //alert('Error 0 Alegc  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    })
  }

  public getAlegs(alegs: any, idpass, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("select * from Alegc where idpass like '" + idpass + "' and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertAlegs(alegs, codeClinique);
          } else {
            var an;
            for (var i = 0; i < result.rows.length; i++) {
              an = new AntecCh();
              an.setidpass(result.rows.item(i).idpass);
              an.setch(result.rows.item(i).ch);
              this.aleg.push(an);
            }
          }
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 1 Alegc  ' + error);
        })
    });

    return this.aleg;
  }

  private _insertAlegs(alegs: Array<AntecCh>, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in alegs) {
        if (!alegs.hasOwnProperty(key)) {
          continue;
        }
        let antec = alegs[key];
        db.executeSql('insert into Alegc (idpass ,ch ,codeClinique) values (?,?,?)', [
          antec.getidpass(),
          antec.getch(),
          codeClinique
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 Alegc ' + error);
    });

  }

  public deleteAlegs(idpass, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from Alegc where  idpass like '" + idpass + "' and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //     //alert("Suppression de table Aleg est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 Alegc  ' + error);
        })
    });

    return this.aleg;
  }
}
