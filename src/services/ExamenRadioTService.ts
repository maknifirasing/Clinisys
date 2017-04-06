import {SQLite} from 'ionic-native';
import {ExamenRadio} from "../models/ExamenRadio";

export class ExamenRadioTService {
  public examenRadio: Array<ExamenRadio> = [];

  constructor() {
  }

  public verifExamenRadio(examenRadios: any, numeroDossier, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from ExamenRadioT where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 ExamenRadioT  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getExamenRadios(examenRadios: any, numeroDossier, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from ExamenRadioT where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertExamenRadios(examenRadios, codeClinique);
          } else {
            var ex;
            for (var i = 0; i < result.rows.length; i++) {
              ex = new ExamenRadio();
              ex.setcodeExamen(result.rows.item(i).codeExamen);
              ex.setcompterendu(result.rows.item(i).compterendu);
              ex.setdateExamen(result.rows.item(i).dateExamen);
              ex.setdatePrevu(result.rows.item(i).datePrevu);
              ex.setdate_RDV(result.rows.item(i).date_RDV);
              ex.setdesignationExamen(result.rows.item(i).designationExamen);
              ex.setheurePrevu(result.rows.item(i).heurePrevu);
              ex.setidres(result.rows.item(i).idres);
              ex.setmedecin(result.rows.item(i).medecin);
              ex.setnature(result.rows.item(i).nature);
              ex.setnumeroDossier(result.rows.item(i).numeroDossier);
              ex.setnumeroExamen(result.rows.item(i).numeroExamen);
              ex.setobserv(result.rows.item(i).observ);
              ex.setresultat(result.rows.item(i).resultat);
              this.examenRadio.push(ex);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 ExamenRadioT  ' + error);
        })
    });
    db.close();
    return this.examenRadio;
  }

  private _insertExamenRadios(examenRadios: Array<ExamenRadio>, codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in examenRadios) {
        if (!examenRadios.hasOwnProperty(key)) {
          continue;
        }
        let examenRadio = examenRadios[key];
        db.executeSql('insert into ExamenRadioT (codeExamen,compterendu ,dateExamen ' +
          ',datePrevu, date_RDV,designationExamen,heurePrevu,idres,medecin,nature,numeroDossier,numeroExamen,observ,resultat,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          examenRadio.getcodeExamen(),
          examenRadio.getcompterendu(),
          examenRadio.getdateExamen(),
          examenRadio.getdatePrevu(),
          examenRadio.getdate_RDV(),
          examenRadio.getdesignationExamen(),
          examenRadio.getheurePrevu(),
          examenRadio.getidres(),
          examenRadio.getmedecin(),
          examenRadio.getnature(),
          examenRadio.getnumeroDossier(),
          examenRadio.getnumeroExamen(),
          examenRadio.getobserv(),
          examenRadio.getresultat(),
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 ExamenRadioT ' + error);
    });
    db.close();
  }

  public deleteExamenRadios(numeroDossier, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from ExamenRadioT where numeroDossier like '" + numeroDossier + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
      //    alert("Suppression de table ExamenRadioT est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 ExamenRadioT  ' + error);
        })
    });
    db.close();
    return this.examenRadio;
  }
}
