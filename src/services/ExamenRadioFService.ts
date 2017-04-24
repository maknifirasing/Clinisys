import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {ExamenRadio} from "../models/ExamenRadio";

export class ExamenRadioFService {
  public examenRadio: Array<ExamenRadio> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifExamenRadio(examenRadios: any, numeroDossier, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from ExamenRadioF where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 ExamenRadioF  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getExamenRadios(examenRadios: any, numeroDossier, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("select * from ExamenRadioF where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertExamenRadios(examenRadios, codeClinique);
          } else {
            var ex;
            for (var i = 0; i < result.rows.length; i++) {
              ex = new ExamenRadio();
              ex.setcompterendu(result.rows.item(i).compterendu);
              ex.setdateExamen(result.rows.item(i).dateExamen);
              ex.setdesignationExamen(result.rows.item(i).designationExamen);
              ex.setnumeroDossier(result.rows.item(i).numeroDossier);
              ex.setobserv(result.rows.item(i).observ);
              this.examenRadio.push(ex);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 ExamenRadioF  ' + error);
        })
    });

    return this.examenRadio;
  }

  private _insertExamenRadios(examenRadios: Array<ExamenRadio>, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in examenRadios) {
        if (!examenRadios.hasOwnProperty(key)) {
          continue;
        }
        let examenRadio = examenRadios[key];
        db.executeSql('insert into ExamenRadioF (compterendu,dateExamen,designationExamen,numeroDossier,observ,codeClinique) values (?,?,?,?,?,?)', [
          examenRadio.getcompterendu(),
          examenRadio.getdateExamen(),
          examenRadio.getdesignationExamen(),
          examenRadio.getnumeroDossier(),
          examenRadio.getobserv(),
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 ExamenRadioF ' + error);
    });

  }

  public deleteExamenRadios(numeroDossier, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from ExamenRadioF where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table ExamenRadioF est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 ExamenRadioF  ' + error);
        })
    });

    return this.examenRadio;
  }
}
