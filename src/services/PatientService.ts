import {SQLite} from 'ionic-native';
import {Patient} from "../models/Patient";

export class PatientService {
  public patient: Array<Patient> = [];
  verif: boolean;

  constructor() {
  }

  public verifPatient(patients: any, user, searchText, etage) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'", [])
        .then(result => {
          if (result.rows.length === patients.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 Patient  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getPatients(patients: any, user, searchText, etage) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertPatients(patients, user, searchText, etage)
          } else {
            var p;
            for (var i = 0; i < result.rows.length; i++) {
              p = new Patient();
              p.setid(result.rows.item(i).id);
              p.setdossier(result.rows.item(i).dossier);
              p.setchambre(result.rows.item(i).chambre);
              p.setprenom(result.rows.item(i).prenom);
              p.setnom(result.rows.item(i).nom);
              p.setdateNaiss(result.rows.item(i).dateNaiss);
              p.setmedecin(result.rows.item(i).medecin);
              p.setspec(result.rows.item(i).spec);
              p.setetat(result.rows.item(i).etat);
              p.setnature(result.rows.item(i).nature);
              p.setage(result.rows.item(i).age);
              p.setimg(result.rows.item(i).img);
              this.patient.push(p);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Patient  ' + error);
        })
    });
    db.close();
    return this.patient;
  }

  private _insertPatients(patients: Array<Patient>, user, searchText, etage): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in patients) {
        if (!patients.hasOwnProperty(key)) {
          continue;
        }
        let patient = patients[key];
        db.executeSql('insert into Patient (id, dossier, chambre, nom, prenom, dateNaiss, medecin, spec, etat, age, img, nature,  user, searchText, etage) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          patient.getid(),
          patient.getdossier(),
          patient.getchambre(),
          patient.getnom(),
          patient.getprenom(),
          patient.getdateNaiss(),
          patient.getmedecin(),
          patient.getspec(),
          patient.getetat(),
          patient.getage(),
          patient.getimg(),
          patient.getnature(),
          user,
          searchText,
          etage
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Patient ' + error);
    });
    db.close();
  }


  public deletePatients(user, searchText, etage) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'", [])
        .then(() => {
        //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Patient  ' + error);
        })
    });
    db.close();
    return this.patient;
  }
}
