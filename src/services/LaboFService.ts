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
              l.setdateRealisation(result.rows.item(i).dateRealisation)
              l.setdesignation(result.rows.item(i).designation);
              l.setetatExamen(result.rows.item(i).etatExamen);
              l.setid(result.rows.item(i).id);
              l.setmedecinTraitant(result.rows.item(i).medecinTraitant);
              l.setnomLabo(result.rows.item(i).nomLabo);
              l.setnumAdmission(result.rows.item(i).numAdmission);
              l.setnumDossier(result.rows.item(i).numDossier);
              l.setpatient(result.rows.item(i).patient);
              l.setstate(result.rows.item(i).state);
              l.setuserName(result.rows.item(i).userName);
              l.setvalidation(result.rows.item(i).validation);
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
          ',dateRealisation, designation,etatExamen,id,medecinTraitant,nomLabo,numAdmission,numDossier,patient,state,userName,validation,pdf,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          labo.getcodeDemande(),
          labo.getcontenuePDF(),
          labo.getdateDemande(),
          labo.getdateRealisation(),
          labo.getdesignation(),
          labo.getetatExamen(),
          labo.getid(),
          labo.getmedecinTraitant(),
          labo.getnomLabo(),
          labo.getnumAdmission(),
          labo.getnumDossier(),
          labo.getpatient(),
          labo.getstate(),
          labo.getuserName(),
          labo.getvalidation(),
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
          alert("Suppression de table Labo est terminé avec succes");
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
