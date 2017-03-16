import {SQLite} from 'ionic-native';
import {MotifHospitalisation} from "../models/motifHospitalisation";

export class motifHospitalisationService {
  public motifhospitalisation: Array<MotifHospitalisation> = [];
  verif: boolean;

  constructor() {
  }

  public verifmotifHospitalisation(motifhospitalisations: any, numdoss,codeClinique) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === motifhospitalisations.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 motifHospitalisation  ' + error);
        })
    });
    db.close();
    return this.verif;
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
              m.setconclusion(result.rows.item(0).conclusion);
              m.setdateRdv(result.rows.item(0).dateRdv);
              m.setdateSortie(result.rows.item(0).dateSortie);
              m.setgroupeSang(result.rows.item(0).groupeSang);
              m.setheureRdv(result.rows.item(0).heureRdv);
              m.setheureSortie(result.rows.item(0).heureSortie);
              m.sethistoiremaladie(result.rows.item(0).histoiremaladie);
              m.setmotifhospitalisation(result.rows.item(0).motifhospitalisation);
              m.setnumdoss(result.rows.item(0).numdoss);
              m.setobservationSejour(result.rows.item(0).observationSejour);
              m.setpoid(result.rows.item(0).poid);
              m.settaille(result.rows.item(0).taille);
              m.settraitementHabituelle(result.rows.item(0).traitementHabituelle);
              m.settraitementSejour(result.rows.item(0).traitementSejour);
              m.settraitementSortie(result.rows.item(0).traitementSortie);
              m.setutilisateurMotif(result.rows.item(0).utilisateurMotif);
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
        db.executeSql('insert into motifHospitalisation (conclusion ,dateRdv ,dateSortie' +
          ',groupeSang ,heureRdv, heureSortie ,histoiremaladie ,motifhospitalisation ,numdoss ,observationSejour ,poid ,taille ,traitementHabituelle ,traitementSejour ,traitementSortie ,utilisateurMotif,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [

          motifhospitalisation.getconclusion(),
          motifhospitalisation.getdateRdv(),
          motifhospitalisation.getdateSortie(),
          motifhospitalisation.getgroupeSang(),
          motifhospitalisation.getheureRdv(),
          motifhospitalisation.getheureSortie(),
          motifhospitalisation.gethistoiremaladie(),
          motifhospitalisation.getmotifhospitalisation(),
          motifhospitalisation.getnumdoss(),
          motifhospitalisation.getobservationSejour(),
          motifhospitalisation.getpoid(),
          motifhospitalisation.gettaille(),
          motifhospitalisation.gettraitementHabituelle(),
          motifhospitalisation.gettraitementSejour(),
          motifhospitalisation.gettraitementSortie(),
          motifhospitalisation.getutilisateurMotif(),
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
