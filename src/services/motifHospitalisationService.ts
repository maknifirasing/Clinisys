import {SQLite} from 'ionic-native';
import {MotifHospitalisation} from "../models/motifHospitalisation";

export class motifHospitalisationService {
  public motifhospitalisation: Array<MotifHospitalisation> = [];

  constructor() {
  }

  public verifmotifHospitalisation(motifhospitalisations: any, numdoss,codeClinique) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select count(*) as sum from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
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
          alert('Error 0 motifHospitalisation  ' + error);
          resolve(false);
          return false;
        })
    });
      db.close();
      return this;
    });
  }

  public getmotifHospitalisations(motifhospitalisations: any, numdoss,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertmotifHospitalisations(motifhospitalisations,codeClinique);
          } else {
            var m;
            for (var i = 0; i < result.rows.length; i++) {
              m = new MotifHospitalisation();
              m.setgroupeSang(result.rows.item(0).groupeSang);
              m.setmotifhospitalisation(result.rows.item(0).motifhospitalisation);
              m.setnumdoss(result.rows.item(0).numdoss);
              m.setpoid(result.rows.item(0).poid);
              m.settaille(result.rows.item(0).taille);
              this.motifhospitalisation.push(m);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 motifHospitalisation  ' + error);
        })
    });
    db.close();
    return this.motifhospitalisation;
  }

  private _insertmotifHospitalisations(motifhospitalisations,codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in motifhospitalisations) {
        if (!motifhospitalisations.hasOwnProperty(key)) {
          continue;
        }
        let motifhospitalisation = motifhospitalisations[key];
        db.executeSql('insert into motifHospitalisation (groupeSang ,motifhospitalisation ,numdoss ,poid ,taille ,codeClinique)' +
          ' values (?,?,?,?,?,?)', [
          motifhospitalisation.getgroupeSang(),
          motifhospitalisation.getmotifhospitalisation(),
          motifhospitalisation.getnumdoss(),
          motifhospitalisation.getpoid(),
          motifhospitalisation.gettaille(),
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 motifHospitalisation ' + error);
    });
    db.close();
  }

  public deleteMotifhospitalisations(numdoss,codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Motifhospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
    //      alert("Suppression de table Motifhospitalisation est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Motifhospitalisation  ' + error);
        })
    });
    db.close();
    return this.motifhospitalisation;
  }
}
