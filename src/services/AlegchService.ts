import {SQLite} from 'ionic-native';
import {AntecCh} from "../models/AntecCh";

export class AlegchService {
  public aleg: Array<AntecCh> = [];

  constructor() {
  }

  public verifAleg(alegs: any, idpass,codeClinique) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
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
          console.error('Error opening database', error);
          alert('Error 0 Alegc  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    })
  }

  public getAlegs(alegs: any, idpass,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Alegc where idpass like '" + idpass + "' and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertAlegs(alegs,codeClinique);
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
          console.error('Error opening database', error);
          alert('Error 1 Alegc  ' + error);
        })
    });
    db.close();
    return this.aleg;
  }

  private _insertAlegs(alegs: Array<AntecCh>,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
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
      console.error('Error opening database', error);
      alert('Error 2 Alegc ' + error);
    });
    db.close();
  }

  public deleteAlegs(idpass,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Alegc where  idpass like '" + idpass + "' and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
      //    alert("Suppression de table Aleg est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Alegc  ' + error);
        })
    });
    db.close();
    return this.aleg;
  }
}
