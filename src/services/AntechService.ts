import {SQLite} from 'ionic-native';
import {AntecCh} from "../models/AntecCh";

export class AntechService {
  public antec: Array<AntecCh> = [];

  constructor() {
  }

  public verifAntec(antecs: any, idpass,codeClinique) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from Antech where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.item(0).sum >0) {
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
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    });
  }

  public getAntecs(antecs: any, idpass,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Antech where idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertAntecs(antecs,codeClinique);
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
          console.error('Error opening database', error);
          alert('Error 1 Antech  ' + error);
        })
    });
    db.close();
    return this.antec;
  }

  private _insertAntecs(antecs: Array<AntecCh>,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
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
      console.error('Error opening database', error);
      alert('Error 2 Antech ' + error);
    });
    db.close();
  }

  public deleteAntecs(idpass,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Antech where  idpass like '" + idpass + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
   //       alert("Suppression de table Antech est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Antech  ' + error);
        })
    });
    db.close();
    return this.antec;
  }
}
