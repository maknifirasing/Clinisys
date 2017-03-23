import {SQLite} from 'ionic-native';
import {Evenement} from "../models/Evenement";

export class EvenementHisService {
  public evenement: Array<Evenement> = [];

  constructor() {
  }

  public verifEvenement(evenements: any, numdoss,codeClinique) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from EvenementHis where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
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
          alert('Error 0 EvenementHis  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    });
  }

  public getEvenements(evenements: any, numdoss,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from EvenementHis where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertEvenements(evenements,codeClinique);
          } else {
            var e;
            for (var i = 0; i < result.rows.length; i++) {
              e = new Evenement();
              e.setaccess(result.rows.item(i).access);
              e.setcode(result.rows.item(i).code);
              e.setevenements(result.rows.item(i).evenements);
              e.setorderEvenement(result.rows.item(i).orderEvenement);
              e.setvisible(result.rows.item(i).visible);
              e.setdate(result.rows.item(i).date);
              e.setdetail(result.rows.item(i).detail);
              e.setIDEvenement(result.rows.item(i).IDEvenement);
              e.setnumdoss(result.rows.item(i).numdoss);
              e.setuserCreat(result.rows.item(i).userCreat);


              this.evenement.push(e);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 EvenementHis  ' + error);
        })
    });
    db.close();
    return this.evenement;
  }

  private _insertEvenements(evenements: Array<Evenement>,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in evenements) {
        if (!evenements.hasOwnProperty(key)) {
          continue;
        }
        let evenement = evenements[key];
        db.executeSql('insert into EvenementHis (access ,code ,evenements ' +
          ',orderEvenement ,visible ,date ,detail ,IDEvenement ,numdoss ,userCreat,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?)', [
          evenement.getaccess(),
          evenement.getcode(),
          evenement.getevenements(),
          evenement.getorderEvenement(),
          evenement.getvisible(),
          evenement.getdate(),
          evenement.getdetail(),
          evenement.getIDEvenement(),
          evenement.getnumdoss(),
          evenement.getuserCreat(),
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 EvenementHis ' + error);
    });
    db.close();
  }

   public deleteEvenementHis(numdoss,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from EvenementHis where  numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
      //    alert("Suppression de table EvenementHis est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 EvenementHis  ' + error);
        })
    });
    db.close();
    return this.evenement;
  }
}
