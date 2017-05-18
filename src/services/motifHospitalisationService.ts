import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {MotifHospitalisation} from "../models/motifHospitalisation";

export class motifHospitalisationService {
  public motifhospitalisation = new MotifHospitalisation();

  constructor(private sqlite: SQLite)  {
  }

  public verifmotifHospitalisation(motifhospitalisations: any, numdoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
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
            //console.error('Error opening database', error);
             //alert('Error 0 motifHospitalisation  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getmotifHospitalisations(motifhospitalisations: any, numdoss, codeClinique): Promise<MotifHospitalisation> {
    return new Promise<MotifHospitalisation>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from motifHospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertmotifHospitalisations(motifhospitalisations, codeClinique);
            } else {
              this.motifhospitalisation.setgroupeSang(result.rows.item(0).groupeSang);
              this.motifhospitalisation.setmotifhospitalisation(result.rows.item(0).motifhospitalisation);
              this.motifhospitalisation.setnumdoss(result.rows.item(0).numdoss);
              this.motifhospitalisation.setpoid(result.rows.item(0).poid);
              this.motifhospitalisation.settaille(result.rows.item(0).taille);
              resolve(this.motifhospitalisation);
              return this.motifhospitalisation;
            }
          })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 1 motifHospitalisation  ' + error);
          })
      });

      return this;
    });
  }

  private _insertmotifHospitalisations(motifhospitalisation, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {

      db.executeSql('insert into motifHospitalisation (groupeSang ,motifhospitalisation ,numdoss ,poid ,taille ,codeClinique)' +
        ' values (?,?,?,?,?,?)', [
        motifhospitalisation.getgroupeSang(),
        motifhospitalisation.getmotifhospitalisation(),
        motifhospitalisation.getnumdoss(),
        motifhospitalisation.getpoid(),
        motifhospitalisation.gettaille(),
        codeClinique
      ]);

    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 motifHospitalisation ' + error);
    });

  }

  public deleteMotifhospitalisations(numdoss, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from Motifhospitalisation where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //       //alert("Suppression de table Motifhospitalisation est terminé avec succes");
        })
        .catch(error => {
          //console.error('Error opening database', error);
           //alert('Error 3 Motifhospitalisation  ' + error);
        })
    });

    return this.motifhospitalisation;
  }
}
