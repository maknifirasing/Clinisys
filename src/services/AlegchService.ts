import {SQLite} from 'ionic-native';
import {AntecCh} from "../models/AntecCh";

export class AlegchService {
  public aleg: Array<AntecCh> = [];
  verif: boolean;

  constructor() {
  }

  public verifAleg(alegs: any, idpass) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Alegc where idpass like '" + idpass + "'", [])
        .then(result => {
          if (result.rows.length === alegs.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 Alegc  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getAlegs(alegs: any, idpass) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Alegc where idpass like '" + idpass + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertAlegs(alegs);
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

  private _insertAlegs(alegs: Array<AntecCh>): void {
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
        db.executeSql('insert into Alegc (idpass ,ch) values (?,?)', [
          antec.getidpass(),
          antec.getch()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Alegc ' + error);
    });
    db.close();
  }

  public deleteAlegs(idpass) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Alegc where  idpass like '" + idpass + "'", [])
        .then(() => {
          alert("Suppression de table Aleg est terminé avec succes");
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
