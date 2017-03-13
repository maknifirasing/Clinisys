import {SQLite} from 'ionic-native';
import {MotifHospitalisation} from "../models/motifHospitalisation";

export class motifHospitalisationService {
  public motifhospitalisation=new MotifHospitalisation();
  verif: boolean;

  constructor() {
  }

  public verifmotifHospitalisation(motifhospitalisations: any, numdoss) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'", [])
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

  public getmotifHospitalisations(motifhospitalisations: any, numdoss) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertmotifHospitalisations(motifhospitalisations);
          } else {
              this.motifhospitalisation.setconclusion(result.rows.item(0).conclusion);
              this.motifhospitalisation.setdateRdv(result.rows.item(0).dateRdv);
              this.motifhospitalisation.setdateSortie(result.rows.item(0).dateSortie);
              this.motifhospitalisation.setgroupeSang(result.rows.item(0).groupeSang);
              this.motifhospitalisation.setheureRdv(result.rows.item(0).heureRdv);
              this.motifhospitalisation.setheureSortie(result.rows.item(0).heureSortie);
              this.motifhospitalisation.sethistoiremaladie(result.rows.item(0).histoiremaladie);
              this.motifhospitalisation.setmotifhospitalisation(result.rows.item(0).motifhospitalisation);
              this.motifhospitalisation.setnumdoss(result.rows.item(0).numdoss);
              this.motifhospitalisation.setobservationSejour(result.rows.item(0).observationSejour);
              this.motifhospitalisation.setpoid(result.rows.item(0).poid);
              this.motifhospitalisation.settaille(result.rows.item(0).taille);
              this.motifhospitalisation.settraitementHabituelle(result.rows.item(0).traitementHabituelle);
              this.motifhospitalisation.settraitementSejour(result.rows.item(0).traitementSejour);
              this.motifhospitalisation.settraitementSortie(result.rows.item(0).traitementSortie);
              this.motifhospitalisation.setutilisateurMotif(result.rows.item(0).utilisateurMotif);
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

  private _insertmotifHospitalisations(motifhospitalisation): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
        db.executeSql('insert into motifHospitalisation (conclusion ,dateRdv ,dateSortie' +
          ',groupeSang ,heureRdv, heureSortie ,histoiremaladie ,motifhospitalisation ,numdoss ,observationSejour ,poid ,taille ,traitementHabituelle ,traitementSejour ,traitementSortie ,utilisateurMotif) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
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
          motifhospitalisation.getutilisateurMotif()
        ]);
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 motifHospitalisation ' + error);
    });
    db.close();
  }

  public deleteMotifhospitalisations(numdoss) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Motifhospitalisation where numdoss like '" + numdoss + "'", [])
        .then(() => {
    //      alert("Suppression de table Motifhospitalisation est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Motifhospitalisation  ' + error);
        })
    });
    db.close();
    return this.motifhospitalisation;
  }
}
