import {SQLite} from 'ionic-native';
import {Medecin} from "../models/Medecin";

export class MedecinService {
  public medecin: Array<Medecin> = [];

  constructor() {
  }

  public verifMedecin(medecins: any, numdoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 Medecin  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getMedecins(medecins: any, numdoss, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertMedecins(medecins, numdoss);
          } else {
            var med;
            for (var i = 0; i < result.rows.length; i++) {
              med = new Medecin();
              med.setcodMed(result.rows.item(i).codMed);
              med.setnomMed(result.rows.item(i).nomMed);
              med.setdesignationSpecialite(result.rows.item(i).designationSpecialite);
              med.setcodeClinique(result.rows.item(i).codeClinique)
              this.medecin.push(med);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 medecin  ' + error);
        })
    });
    db.close();
    return this.medecin;
  }

  private _insertMedecins(medecins: Array<Medecin>, numdoss): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in medecins) {
        if (!medecins.hasOwnProperty(key)) {
          continue;
        }
        let medecin = medecins[key];
        db.executeSql('insert into Medecin (codMed,nomMed,designationSpecialite' +
          ',codeClinique,numdoss) values (?,?,?,?,?)', [
          medecin.getcodMed(),
          medecin.getnomMed(),
          medecin.getdesignationSpecialite(),
          medecin.getcodeClinique(),
          numdoss
        ])
        ;
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 medecin ' + error);
    });
    db.close();
  }

  public deleteMedecins(numdoss, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Medecin where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          alert("Suppression de table medecin est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 medecin  ' + error);
        })
    });
    db.close();
    return this.medecin;
  }
}
