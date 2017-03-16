import {SQLite} from 'ionic-native';
import {HistDossier} from "../models/HistDossier";

export class HistDossierService {
  public histDossier: Array<HistDossier> = [];
  verif: boolean;

  constructor() {
  }

  public verifHistDossier(numDoss, codeClinique) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 1) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 HistDossier  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getHistDossiers(histDossiers: any, numDoss, codeClinique) {
    this.histDossier.push(histDossiers[0]);
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertHistPatients(histDossiers);
          } else {
            this.histDossier.pop();
            this.histDossier = [];
            this.histDossier.length = 0;
            var d;
            for (var i = 0; i < result.rows.length; i++) {
              d = new HistDossier();
              d.setnumDoss(result.rows.item(i).numDoss);
              d.setdate(result.rows.item(i).date);
              d.setcodeClinique(result.rows.item(i).codeClinique);
              this.histDossier.push(d);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1.1 HistDossier  ' + error);
        })
    });
    db.close();
    return this.histDossier;
  }

  public getHistDossiersOff(histDossiers: any, numDoss, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            return this.histDossier;
          } else {
            var d;
            for (var i = 0; i < result.rows.length; i++) {
              d = new HistDossier();
              d.setnumDoss(result.rows.item(i).numDoss);
              d.setdate(result.rows.item(i).date);
              d.setcodeClinique(result.rows.item(i).codeClinique);
              this.histDossier.push(d);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1.2 HistDossier  ' + error);
        })
    });
    db.close();
    return this.histDossier;
  }


  private _insertHistPatients(histDossiers: Array<HistDossier>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in histDossiers) {
        if (!histDossiers.hasOwnProperty(key)) {
          continue;
        }
        let histDossier = histDossiers[key];
        db.executeSql('insert into HistDossier (numDoss ,date ,codeClinique) values (?,?,?)', [
          histDossier.getnumDoss(),
          histDossier.getdate(),
          histDossier.getcodeClinique()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 HistDossier ' + error);
    });
    db.close();
  }


  public deleteHistDossiers(numDoss, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from HistDossier where numDoss like '" + numDoss + "' and codeClinique like '" + codeClinique + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 HistDossier  ' + error);
        })
    });
    db.close();
    return this.histDossier;
  }
}
