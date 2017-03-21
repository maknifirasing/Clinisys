import {SQLite} from 'ionic-native';
import {Labo} from "../models/Labo";

export class LaboService {
  public labo: Array<Labo> = [];
  verif: boolean;

  constructor() {
  }

  public verifLabo(labos: any, numAdmission,codeClinique,pdf) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Labo where numAdmission like '" + numAdmission + "'and codeClinique like '" + codeClinique + "' and pdf like '" +pdf +"'", [])
        .then(result => {
          if (result.rows.length === labos.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 Labo  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getLabos(labos: any, numAdmission,codeClinique,pdf) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Labo where numAdmission like '" + numAdmission + "'and codeClinique like '" + codeClinique + "' and pdf like '" +pdf +"'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertLabos(labos,codeClinique,pdf);
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
              this.labo.push(l);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Labo  ' + error);
        })
    });
    db.close();
    return this.labo;
  }

  private _insertLabos(labos: Array<Labo>,codeClinique,pdf): void {
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
        db.executeSql('insert into Labo (codeDemande,contenuePDF ,dateDemande ' +
          'dateRealisation, designation,etatExamen,id,medecinTraitant,nomLabo,numAdmission,numDossier,patient,state,userName,validation,codeClinique,pdf) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [

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
          codeClinique,
          pdf

        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Labo ' + error);
    });
    db.close();
  }

  public deleteLabos(numAdmission,codeClinique,pdf) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Labo where numAdmission like '" + numAdmission + "'and codeClinique like '" + codeClinique + "' and pdf like '" +pdf +"'", [])
        .then(() => {
          alert("Suppression de table Labo est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Labo  ' + error);
        })
    });
    db.close();
    return this.labo;
  }
}
