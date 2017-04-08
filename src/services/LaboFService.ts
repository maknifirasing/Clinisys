import {SQLite} from 'ionic-native';
import {Labo} from "../models/Labo";

export class LaboFService {
  public labo: Array<Labo> = [];

  constructor() {
  }

  public verifLabo(labos: any, numDossier,codeClinique) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from LaboF where numDossier like '" + numDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
          alert('Error 0 LaboF  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    });
  }

  public getLabos(labos: any, numDossier,codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from LaboF where numDossier like '" + numDossier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertLabos(labos,codeClinique);
          } else {
            var l;
            for (var i = 0; i < result.rows.length; i++) {
              l = new Labo();
              l.setcodeDemande(result.rows.item(i).codeDemande);
              l.setcontenuePDF(result.rows.item(i).contenuePDF);
              l.setdateDemande(result.rows.item(i).dateDemande);
              l.setmedecinTraitant(result.rows.item(i).medecinTraitant);
              l.setnumAdmission(result.rows.item(i).numAdmission);
              l.setnumDossier(result.rows.item(i).numDossier);
              l.setpdf(result.rows.item(i).pdf);
              this.labo.push(l);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 LaboF  ' + error);
        })
    });
    db.close();
    return this.labo;
  }

  private _insertLabos(labos: Array<Labo>,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in labos) {
        if (!labos.hasOwnProperty(key)) {
          continue;
        }
        let labo = labos[key];
        db.executeSql('insert into LaboF (codeDemande,contenuePDF ,dateDemande ' +
          ',medecinTraitant,numAdmission,numDossier,pdf,codeClinique) values (?,?,?,?,?,?,?,?)', [
          labo.getcodeDemande(),
          labo.getcontenuePDF(),
          labo.getdateDemande(),
          labo.getmedecinTraitant(),
          labo.getnumAdmission(),
          labo.getnumDossier(),
          labo.getpdf(),
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 LaboF ' + error);
    });
    db.close();
  }

  public deleteLabos(numDossier,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from LaboF where numDossier like '" + numDossier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
   //       alert("Suppression de table Labo est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 LaboF  ' + error);
        })
    });
    db.close();
    return this.labo;
  }
}
