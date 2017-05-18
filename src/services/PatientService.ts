import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Patient} from "../models/Patient";

export class PatientService {
  public patient: Array<Patient> = [];

  constructor(private sqlite: SQLite)  {
  }

  public  verifPatient(patients: any, user, searchText, etage, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'and codeClinique like '" + codeClinique + "'", [])
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
            //console.error('Error opening database', error);
             //alert('Error 0 Patient  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getPatients(patients: any, user, searchText, etage, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("select * from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertPatients(patients, user, searchText, etage, codeClinique)
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
          //console.error('Error opening database', error);
           //alert('Error 1 Patient  ' + error);
        })
    });

    return this.patient;
  }

  private _insertPatients(patients: Array<Patient>, user, searchText, etage, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in patients) {
        if (!patients.hasOwnProperty(key)) {
          continue;
        }
        let patient = patients[key];
        db.executeSql('insert into Patient (id ,dossier ,chambre ,nom ,prenom ,dateNaiss, medecin, spec, etat, age, img, nature ,user, searchText ,etage,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
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
          etage,
          codeClinique
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 Patient ' + error);
    });

  }


  public deletePatients(user, searchText, etage, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from Patient where user like '" + user + "' and searchText like '" + searchText + "' and etage like '" + etage + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   //alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 Patient  ' + error);
        })
    });

    return this.patient;
  }
}
